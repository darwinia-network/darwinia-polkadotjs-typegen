// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { ITuple } from '@polkadot/types/types';
import { Compact, Enum, Option, Struct, U8aFixed, Vec } from '@polkadot/types/codec';
import { Bytes, Text, U256, u32, u64, u8 } from '@polkadot/types/primitive';
import { EthereumAddress } from '@polkadot/types/interfaces/claims';
import { EraIndex } from '@polkadot/types/interfaces/staking';
import { AccountId, Balance, BlockNumber, H160, H256, H512, Hash, LockIdentifier } from '@polkadot/types/interfaces/runtime';

/** @name AccountData */
export interface AccountData extends Struct {
  readonly free: Balance;
  readonly reserved: Balance;
  readonly freeKton: Balance;
  readonly reservedKton: Balance;
  readonly miscFrozen: Balance;
  readonly feeFrozen: Balance;
}

/** @name Address */
export interface Address extends AccountId {}

/** @name AddressT */
export interface AddressT extends U8aFixed {}

/** @name BalanceInfo */
export interface BalanceInfo extends Struct {}

/** @name BalanceLock */
export interface BalanceLock extends Struct {
  readonly id: LockIdentifier;
  readonly lockFor: LockFor;
  readonly reasons: Reasons;
}

/** @name Bloom */
export interface Bloom extends U8aFixed {}

/** @name ChainProperties */
export interface ChainProperties extends Struct {
  readonly ss58Format: Option<u8>;
  readonly tokenDecimals: Option<u32>;
  readonly tokenSymbol: Option<Text>;
  readonly ktonTokenDecimals: Option<u32>;
  readonly ktonTokenSymbol: Option<Text>;
}

/** @name Common */
export interface Common extends Struct {
  readonly amount: Balance;
}

/** @name DepositId */
export interface DepositId extends U256 {}

/** @name DoubleNodeWithMerkleProof */
export interface DoubleNodeWithMerkleProof extends Struct {
  readonly dagNodes: ITuple<[H512, H512]>;
  readonly proof: Vec<H128>;
}

/** @name EcdsaSignature */
export interface EcdsaSignature extends U8aFixed {}

/** @name ElectionResultT */
export interface ElectionResultT extends Struct {}

/** @name EthAddress */
export interface EthAddress extends H160 {}

/** @name EthBlockNumber */
export interface EthBlockNumber extends u64 {}

/** @name EthHeader */
export interface EthHeader extends Struct {
  readonly parentHash: H256;
  readonly timestamp: u64;
  readonly number: EthBlockNumber;
  readonly author: EthAddress;
  readonly transactionsRoot: H256;
  readonly unclesHash: H256;
  readonly extraData: Bytes;
  readonly stateRoot: H256;
  readonly receiptsRoot: H256;
  readonly logBloom: Bloom;
  readonly gasUsed: U256;
  readonly gasLimit: U256;
  readonly difficulty: U256;
  readonly seal: Vec<Bytes>;
  readonly hash: H256;
}

/** @name EthHeaderBrief */
export interface EthHeaderBrief extends Struct {
  readonly total_difficulty: U256;
  readonly parentHash: H256;
  readonly number: EthBlockNumber;
  readonly relayer: AccountId;
}

/** @name EthNetworkType */
export interface EthNetworkType extends Enum {
  readonly isMainnet: boolean;
  readonly isRopsten: boolean;
}

/** @name EthReceiptProof */
export interface EthReceiptProof extends Struct {
  readonly index: u64;
  readonly proof: Bytes;
  readonly headerHash: H256;
}

/** @name EthTransactionIndex */
export interface EthTransactionIndex extends ITuple<[H256, u64]> {}

/** @name Exposure */
export interface Exposure extends ExposureT {}

/** @name ExposureT */
export interface ExposureT extends Struct {
  readonly ownRingBalance: Compact<Balance>;
  readonly ownKtonBalance: Compact<Balance>;
  readonly ownPower: Power;
  readonly totalPower: Power;
  readonly others: Vec<IndividualExposure>;
}

/** @name H128 */
export interface H128 extends U8aFixed {}

/** @name IndividualExposure */
export interface IndividualExposure extends Struct {
  readonly who: AccountId;
  readonly ringBalance: Compact<Balance>;
  readonly ktonBalance: Compact<Balance>;
  readonly power: Power;
}

/** @name KtonBalance */
export interface KtonBalance extends Balance {}

/** @name LockFor */
export interface LockFor extends Enum {
  readonly isCommon: boolean;
  readonly asCommon: Common;
  readonly isStaking: boolean;
  readonly asStaking: StakingLock;
}

/** @name LogEntry */
export interface LogEntry extends Struct {}

/** @name MerkleMountainRangeRootLog */
export interface MerkleMountainRangeRootLog extends Struct {
  readonly prefix: U8aFixed;
  readonly mmrRoot: Hash;
}

/** @name OtherAddress */
export interface OtherAddress extends Enum {
  readonly isEth: boolean;
  readonly asEth: EthereumAddress;
  readonly isTron: boolean;
  readonly asTron: TronAddress;
}

/** @name OtherSignature */
export interface OtherSignature extends Enum {
  readonly isEth: boolean;
  readonly asEth: EcdsaSignature;
  readonly isTron: boolean;
  readonly asTron: EcdsaSignature;
}

/** @name Power */
export interface Power extends u32 {}

/** @name Reasons */
export interface Reasons extends Enum {
  readonly isFee: boolean;
  readonly isMisc: boolean;
  readonly isAll: boolean;
}

/** @name Receipt */
export interface Receipt extends Struct {
  readonly gasUsed: U256;
  readonly logBloom: Bloom;
  readonly logs: Vec<LogEntry>;
  readonly outcome: TransactionOutcome;
}

/** @name RedeemFor */
export interface RedeemFor extends Enum {
  readonly isRing: boolean;
  readonly asRing: EthReceiptProof;
  readonly isKton: boolean;
  readonly asKton: EthReceiptProof;
  readonly isDeposit: boolean;
  readonly asDeposit: EthReceiptProof;
}

/** @name RewardDestination */
export interface RewardDestination extends Enum {
  readonly isStaked: boolean;
  readonly asStaked: Staked;
  readonly isStash: boolean;
  readonly isController: boolean;
}

/** @name RingBalance */
export interface RingBalance extends Balance {}

/** @name RKT */
export interface RKT extends Struct {
  readonly r: Balance;
  readonly k: Balance;
}

/** @name SpanRecord */
export interface SpanRecord extends Struct {
  readonly slashed: RKT;
  readonly paidOut: RKT;
}

/** @name Staked */
export interface Staked extends Struct {
  readonly promiseMonth: u8;
}

/** @name StakingBalanceT */
export interface StakingBalanceT extends Enum {
  readonly isRingBalance: boolean;
  readonly asRingBalance: Balance;
  readonly isKtonBalance: boolean;
  readonly asKtonBalance: Balance;
}

/** @name StakingLedgerT */
export interface StakingLedgerT extends Struct {
  readonly stash: AccountId;
  readonly activeRing: Compact<Balance>;
  readonly activeDepositRing: Compact<Balance>;
  readonly activeKton: Compact<Balance>;
  readonly depositItems: Vec<TimeDepositItem>;
  readonly ringStakingLock: StakingLock;
  readonly ktonStakingLock: StakingLock;
  readonly claimedRewards: Vec<EraIndex>;
}

/** @name StakingLock */
export interface StakingLock extends Struct {
  readonly stakingAmount: Balance;
  readonly unbondings: Vec<Unbonding>;
}

/** @name TimeDepositItem */
export interface TimeDepositItem extends Struct {
  readonly value: Compact<Balance>;
  readonly startTime: Compact<TsInMs>;
  readonly expireTime: Compact<TsInMs>;
}

/** @name TransactionOutcome */
export interface TransactionOutcome extends Struct {}

/** @name TronAddress */
export interface TronAddress extends EthereumAddress {}

/** @name TsInMs */
export interface TsInMs extends u64 {}

/** @name Unbonding */
export interface Unbonding extends Struct {
  readonly amount: Balance;
  readonly moment: BlockNumber;
}

export type PHANTOM_DARWINIAINJECT = 'darwiniaInject';
