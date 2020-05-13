// We need to import the augmented definitions "somewhere" in our project, however since we have
// it in tsconfig as an override and the api/types has imports, it is not strictly required here.
// Because of the tsconfig override, we could import from '@polkadot/{api, types}/augment'
import './interfaces/augment-api';
import './interfaces/augment-types';

// all type stuff, the only one we are using here
import type { StakingLedgerT } from './interfaces';

// external imports
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Option } from '@polkadot/types';

// our local stuff
import * as definitions from './interfaces/definitions';

async function main(): Promise<void> {
  // extract all types from definitions - fast and dirty approach, flatted on 'types'
  const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
  // const provider = new WsProvider('wss://crab.darwinia.network');
  const provider = new WsProvider('wss://crab.darwinia.network');

  const api = await ApiPromise.create({
    provider,
    types: {
      ...types,
      // aliasses that don't do well as part of interfaces
      // chain-specific overrides
    }
  });

  // get a query
  const ledgerOpt: Option<StakingLedgerT> = await api.query.staking.ledger('5HE1gjo5cRP5Xzf42zrc3gExws6zqrtnMsHTi3jZ5KbLpKnd');

  // the types match with what we expect here
  let ledger: StakingLedgerT | null = ledgerOpt.unwrapOr(null);
  console.log(ledger && ledger.toHuman());

  api.disconnect()
}

main();
