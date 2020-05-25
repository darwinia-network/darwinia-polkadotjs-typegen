// We need to import the augmented definitions "somewhere" in our project, however since we have
// it in tsconfig as an override and the api/types has imports, it is not strictly required here.
// Because of the tsconfig override, we could import from '@polkadot/{api, types}/augment'
import '../interfaces/augment-api';
import '../interfaces/augment-types';

// external imports
import { ApiPromise, WsProvider } from '@polkadot/api';
import { HeaderExtended } from '@polkadot/api-derive';
import createPair from '@polkadot/keyring/pair';
import { cryptoWaitReady, encodeAddress as toSS58, mnemonicToMiniSecret, schnorrkelKeypairFromSeed } from '@polkadot/util-crypto';
import { EventRecord, SignedBlock } from '@polkadot/types/interfaces';

// our local stuff
import * as definitions from '../interfaces/definitions';
import jsonrpc from '../interfaces/jsonrpc';

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

  // #############################
  // {
  //   "nonce": 8,
  //   "refcount": 0,
  //   "data": {
  //     "free": 10753082843,
  //     "reserved": 0,
  //     "freeKton": 0,
  //     "reservedKton": 0,
  //     "miscFrozen": 0,
  //     "feeFrozen": 0
  //   }
  // }
  // #############################
  console.log('-----accountInfo----- \n', JSON.stringify(accountInfo, null, 2));

  // const hash = '0x9c77b9357d8a0ee5c51e74f8b69c4187abec772bb9442524865657324f57b95d'; // system.ExtrinsicFailed
  const hash = '0x1acc86a1ec6c1a4df574531505d08c2a16ef34a4d5d48384f7c49bfa18c0e987'; // system.ExtrinsicSuccess
  const getBlock: SignedBlock = await api.rpc.chain.getBlock(hash);
  const events: EventRecord[] = await api.query.system.events.at(hash);
  const getHeader: HeaderExtended | undefined = await api.derive.chain.getHeader(hash);

  const blockNumber = getHeader ? getHeader.number.unwrap() : undefined;
  const parentHash = getHeader ? getHeader.parentHash.toHex() : undefined;

  // #############################
  // {
  //   "block": {
  //     "header": {
  //       "parentHash": "0x1a22884cce439c793b1032cc46624b22bd853824bddce294921ec35a697c7bab",
  //       "number": 186440,
  //       "stateRoot": "0xbaccace94d17f942f22c643352e1a2b1d58b6a46050c39640fc8a24e79fc0d1d",
  //       "extrinsicsRoot": "0x22c5c3e6fb48ca13edf8a0cbe800d565e486a2de4d00c8873790e580666101c8",
  //       "digest": {
  //         "logs": [
  //           {
  //             "PreRuntime": [
  //               1161969986,
  //               "0x02000000000ce3cb0f00000000"
  //             ]
  //           },
  //           {
  //             "Other": "0x4d4d525223930f4c7a1de4fb76783f363f24b03185f5a5c0565f3d9954f15283bc5cf3f5"
  //           },
  //           {
  //             "Seal": [
  //               1161969986,
  //               "0x3e3a6880f14887e03abe6da3415864619d964d8d69f11b48a44e6070bd137a5aed2791fe0f4e4a7ee47a4c36a7b1e77e3a36de0caa88aa3acc556df3cd380289"
  //             ]
  //           }
  //         ]
  //       }
  //     },
  //     "extrinsics": [
  //       "0x280402000b4069993a7201",
  //       "0x1c04070016610b00",
  //       "0x3902840f997f13e232dda143282bf8fcc4b8cc26f0bafcc68baa3e501df441c7cbe8f70017762812ddf0a2a4a2c3c6b2fc2207cc76af4993911ef2219689e8d37350c3ea47f256275aa5e5c7df3fdd2d2c0815bcd7cd3276a00ec5858b415f49263e04034500000013000f998dc5747a354706f475a4890bc9fcda875c1f527b9995e40e1a27e6ef650007c0cd95d4e8"
  //     ]
  //   },
  //   "justification": "0x"
  // }
  // #############################
  console.log('-----blockInfo By Hash----- \n', JSON.stringify(getBlock, null, 2));
  // <BN: 2d848>
  console.log('-----blockNumber----- \n', blockNumber);
  // 0x1a22884cce439c793b1032cc46624b22bd853824bddce294921ec35a697c7bab
  console.log('-----parentHash----- \n', parentHash);

  function filterEvents(index: number, events: EventRecord[] = []): EventRecord[] {
    return events.filter(({ phase }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index));
  }

  const extrinsics = getBlock.block.extrinsics;
  extrinsics.map((value, index) => {
    const { meta, method, section } = api.registry.findMetaCall(value.callIndex);
    // #############################
    // {
    //   "meta": {
    //     "name": "transfer",
    //     "args": [
    //       {
    //         "name": "dest",
    //         "type": "LookupSource"
    //       },
    //       {
    //         "name": "value",
    //         "type": "Compact<Balance>"
    //       }
    //     ],
    //     "documentation": [
    //       " Transfer some liquid free balance to another account.",
    //       "",
    //       " `transfer` will set the `FreeBalance` of the sender and receiver.",
    //       " It will decrease the total issuance of the system by the `TransferFee`.",
    //       " If the sender's account is below the existential deposit as a result",
    //       " of the transfer, the account will be reaped.",
    //       "",
    //       " The dispatch origin for this call must be `Signed` by the transactor.",
    //       "",
    //       " # <weight>",
    //       " - Dependent on arguments but not critical, given proper implementations for",
    //       "   input config types. See related functions below.",
    //       " - It contains a limited number of reads and writes internally and no complex computation.",
    //       "",
    //       " Related functions:",
    //       "",
    //       "   - `ensure_can_withdraw` is always called internally but has a bounded complexity.",
    //       "   - Transferring balances to accounts that did not exist before will cause",
    //       "      `T::OnNewAccount::on_new_account` to be called.",
    //       "   - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.",
    //       "   - `transfer_keep_alive` works the same way as `transfer`, but has an additional",
    //       "     check that the transfer will not kill the origin account.",
    //       "",
    //       " # </weight>"
    //     ]
    //   },
    //   "method": "transfer",
    //   "section": "balances"
    // }
    // #############################
    console.log(`-----extrinsic(${section}.${method})----- \n`, JSON.stringify({ meta, method, section }, null, 2));
    console.log(`-----extrinsic hash----- \n`, value.hash.toHex());

    const thisEvents = filterEvents(index, events);
    
    thisEvents.map(({event}, index) => {
      // #############################
      // balances.Transfer
      // {"index":"0x0e02","data":["5CRAB1XD9Kdmpz1cXAnPtF4BW6r9bugaonyctNPXpDLfPcjs","5CRABzsxoo4dvnt6yYCD1kuVBverAmNqMxvoPgWjT5D2uiCr",999999000000]}
      // system.ExtrinsicSuccess
      // {"index":"0x0000","data":[{"weight":460000000,"class":"Normal","paysFee":"Yes"}]}
      // #############################

      // Transfer succeeded (from, to, value).
      console.log(`-----event section.method----- \n`, `${event.section}.${event.method}`)
      console.log(`-----event detail----- \n`, JSON.stringify(event, null ,2));

      // Confirm whether a cring deposit transaction is successful
      // 1. The block is Finalized
      // 2. In extrinsic ${section}.${method} === 'balances.transfer'
      // 3. The current extrinsic event has ${event.section}.${event.method} === 'balances.Transfer'
      // 4. The current extrinsic event has ${event.section}.${event.method} === 'system.ExtrinsicSuccess'
    });
  });

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
        if (status.type === 'Finalized' && section + '.' + method === 'system.ExtrinsicSuccess') {
          console.log('transfer success');
          api.disconnect();
        }
      });
    });
  });
};

main();
