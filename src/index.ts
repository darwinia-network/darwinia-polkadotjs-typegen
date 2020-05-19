// We need to import the augmented definitions "somewhere" in our project, however since we have
// it in tsconfig as an override and the api/types has imports, it is not strictly required here.
// Because of the tsconfig override, we could import from '@polkadot/{api, types}/augment'
import './interfaces/augment-api';
import './interfaces/augment-types';

// external imports
import { ApiPromise, WsProvider } from '@polkadot/api';

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
  const accountInfo = await api.query.system.account('5HE1gjo5cRP5Xzf42zrc3gExws6zqrtnMsHTi3jZ5KbLpKnd');

  console.log(JSON.stringify(accountInfo, null, 2));

  api.disconnect()
}

main();
