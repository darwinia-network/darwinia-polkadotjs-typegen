/* eslint-disable @typescript-eslint/camelcase */

export default {
  types:   
  {
    // "__[frame.system]__": {},
    "Address": "AccountId",
    // "__[pallet.balances]__": {},
    "BalanceInfo": {},
    "BalanceLock": {
      "id": "LockIdentifier",
      "lockFor": "LockFor",
      "lockReasons": "LockReasons",
      "amount": "Balance",
      "reasons": "Reasons"
    },
    "LockFor": {
      "_enum": {
        "Common": "Common",
        "Staking": "StakingLock"
      }
    },
    "Common": {
      "amount": "Balance"
    },
    "StakingLock": {
      "stakingAmount": "Balance",
      "unbondings": "Vec<Unbonding>"
    },
    "LockReasons": {
      "_enum": {
        "Fee": null,
        "Misc": null,
        "All": null
      }
    },
    "Unbonding": {
      "amount": "Balance",
      "moment": "BlockNumber"
    },
    "AccountData": {
      "free": "Balance",
      "reserved": "Balance",
      "freeKton": "Balance",
      "reservedKton": "Balance",
      "miscFrozen": "Balance",
      "feeFrozen": "Balance"
    },
    // "__[pallet.staking]__": {},
    "RingBalance": "Balance",
    "KtonBalance": "Balance",
    "TsInMs": "u64",
    "Power": "u32",
    "DepositId": "U256",
    "StakingBalanceT": {
      "_enum": {
        "RingBalance": "Balance",
        "KtonBalance": "Balance"
      }
    },
    "StakingLedgerT": {
      "stash": "AccountId",
      "activeRing": "Compact<Balance>",
      "activeDepositRing": "Compact<Balance>",
      "activeKton": "Compact<Balance>",
      "depositItems": "Vec<TimeDepositItem>",
      "ringStakingLock": "StakingLock",
      "ktonStakingLock": "StakingLock",
      "lastReward": "Option<EraIndex>",
      "total": "Compact<Balance>",
      "active": "Compact<Balance>",
      "unlocking": "Vec<UnlockChunk>"
    },
    "TimeDepositItem": {
      "value": "Compact<Balance>",
      "startTime": "Compact<TsInMs>",
      "expireTime": "Compact<TsInMs>"
    },
    "RewardDestination": {
      "_enum": {
        "Staked": "Staked",
        "Stash": null,
        "Controller": null
      }
    },
    "Staked": {
      "promiseMonth": "u8"
    },
    "ExposureT": {
      "owningBalance": "Compact<Balance>",
      "ownKtonBalance": "Compact<Balance>",
      "ownPower": "Power",
      "totalPower": "Power",
      "others": "Vec<IndividualExposure>",
      "total": "Compact<Balance>",
      "own": "Compact<Balance>"
    },
    "IndividualExposure": {
      "who": "AccountId",
      "ringBalance": "Compact<Balance>",
      "ktonBalance": "Compact<Balance>",
      "power": "Power",
      "value": "Compact<Balance>"
    },
    "RKT": {
      "r": "Balance",
      "k": "Balance"
    },
    // "__[pallet.bridge.eth]__": {},
    "EthTransactionIndex": "(H256, u64)",
    "EthHeaderBrief": {
      "total_difficulty": "U256",
      "parentHash": "H256",
      "number": "EthBlockNumber",
      "relayer": "AccountId"
    },
    "EthBlockNumber": "u64",
    "EthHeader": {
      "parentHash": "H256",
      "timestamp": "u64",
      "number": "EthBlockNumber",
      "author": "EthAddress",
      "transactionsRoot": "H256",
      "unclesHash": "H256",
      "extraData": "Bytes",
      "stateRoot": "H256",
      "receiptsRoot": "H256",
      "logBloom": "Bloom",
      "gasUsed": "U256",
      "gasLimit": "U256",
      "difficulty": "U256",
      "seal": "Vec<Bytes>",
      "hash": "H256"
    },
    "EthAddress": "H160",
    "Bloom": "[u8; 256; Bloom]",
    "H128": "[u8; 16; H128]",
    "DoubleNodeWithMerkleProof": {
      "dagNodes": "(H512, H512)",
      "proof": "Vec<H128>"
    },
    "ElectionResultT": {},
    "LogEntry": {},
    "TransactionOutcome": {},
    "Receipt": {
      "gasUsed": "U256",
      "logBloom": "Bloom",
      "logs": "Vec<LogEntry>",
      "outcome": "TransactionOutcome"
    },
    "EthNetworkType": {
      "_enum": {
        "Mainnet": null,
        "Ropsten": null
      }
    },
    "RedeemFor": {
      "_enum": {
        "Ring": "EthReceiptProof",
        "Kton": "EthReceiptProof",
        "Deposit": "EthReceiptProof"
      }
    },
    "EthReceiptProof": {
      "index": "u64",
      "proof": "Bytes",
      "headerHash": "H256"
    },
    // "__[pallet.claims]__": {},
    "OtherSignature": {
      "_enum": {
        "Eth": "EcdsaSignature",
        "Tron": "EcdsaSignature"
      }
    },
    "EcdsaSignature": "[u8; 65; EcdsaSignature]",
    "TronAddress": "EthereumAddress",
    "OtherAddress": {
      "_enum": {
        "Eth": "EthereumAddress",
        "Tron": "TronAddress"
      }
    },
    "AddressT": "[u8; 20; AddressT]",
    // "__[pallet.header-mmr]__": {},
    "MerkleMountainRangeRootLog": {
      "prefix": "[u8; 4; Prefix]",
      "mmrRoot": "Hash"
    },
    "ChainProperties": {
      "ss58Format": "Option<u8>",
      "tokenDecimals": "Option<u32>",
      "tokenSymbol": "Option<Text>",
      "ktonTokenDecimals": "Option<u32>",
      "ktonTokenSymbol": "Option<Text>"
    },
    "UsableBalance": {
      "usableBalance": "Balance"
    }
  }
};
