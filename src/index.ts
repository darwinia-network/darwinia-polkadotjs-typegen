// We need to import the augmented definitions "somewhere" in our project, however since we have
// it in tsconfig as an override and the api/types has imports, it is not strictly required here.
// Because of the tsconfig override, we could import from '@polkadot/{api, types}/augment'
import './interfaces/augment-api';
import './interfaces/augment-types';

// external imports
import { ApiPromise, WsProvider } from '@polkadot/api';
import createPair from '@polkadot/keyring/pair';
import { cryptoWaitReady, encodeAddress as toSS58, mnemonicToMiniSecret, schnorrkelKeypairFromSeed } from '@polkadot/util-crypto';

// our local stuff
import * as definitions from './interfaces/definitions';
import jsonrpc from './interfaces/jsonrpc';

async function main(): Promise<void> {
  // extract all types from definitions - fast and dirty approach, flatted on 'types'
  const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
  const provider = new WsProvider('wss://crab.darwinia.network');

  const api = await ApiPromise.create({
    provider,
    rpc: {
      ...jsonrpc
    },
    types: {
      ...types,
      // aliasses that don't do well as part of interfaces
      // chain-specific overrides
    }
  });

  // get a query
  const accountInfo = await api.query.system.account('5D9gmgGeNAmG3hTgE89ksEkRRxdxk5CF5BDoLsgLjeaW94Et');

  console.log(JSON.stringify(accountInfo, null, 2));

  const BOB = '5D9gmgGeNAmG3hTgE89ksEkRRxdxk5CF5BDoLsgLjeaW94Et';

  const transferAmount = '123456789';

  cryptoWaitReady().then(() => {
    // Create a extrinsic, transferring randomAmount units to Bob.
    const transfer = api.tx.balances.transfer(BOB, transferAmount);

    const seed = mnemonicToMiniSecret('*** mnemonic ***');
    const keyPair = schnorrkelKeypairFromSeed(seed);

    const alice = createPair({ toSS58, type: 'sr25519' }, { publicKey: keyPair.publicKey, secretKey: keyPair.secretKey }, {});

    transfer.signAndSend(alice, ({ events = [], status }) => {
      if (status.isInBlock) {
        console.log('Successful transfer of ' + transferAmount + ' with hash ' + status.asInBlock.toHex());
      } else {
        console.log('Status of transfer: ' + status.type);
      }

      events.forEach(({ phase, event: { data, method, section } }) => {
        console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());
        if(status.type === 'Finalized' && section + '.' + method === 'system.ExtrinsicSuccess') {
          console.log('transfer success');
          api.disconnect();
        }
      });
    });
  });
};

main();
