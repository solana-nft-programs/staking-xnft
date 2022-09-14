import { secondstoDuration } from '@cardinal/common'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { Text, View } from 'react-xnft'
import {
  formatAmountAsDecimal,
  formatMintNaturalAmountAsDecimal,
} from '../common/units'
import { useRewardDistributorData } from '../hooks/useRewardDistributorData'
import { useRewardEntries } from '../hooks/useRewardEntries'
import { useRewardMintInfo } from '../hooks/useRewardMintInfo'
import { useRewards } from '../hooks/useRewards'
import { useRewardsRate } from '../hooks/useRewardsRate'
import { StakeEntryTokenData } from '../hooks/useStakedTokenDatas'
import { useStakePoolData } from '../hooks/useStakePoolData'
import { useUTCNow } from '../providers/UTCNowProvider'

export function StakedStats({ tokenData }: { tokenData: StakeEntryTokenData }) {
  const { UTCNow } = useUTCNow()
  const rewardMintInfo = useRewardMintInfo()
  const rewardDistributorData = useRewardDistributorData()
  const { data: stakePool } = useStakePoolData()
  const rewardEntries = useRewardEntries()
  const rewardsRate = useRewardsRate()
  const rewards = useRewards()
  return (
    <View>
      {tokenData.stakeEntry &&
        tokenData.stakeEntry.parsed.amount.toNumber() > 1 &&
        rewardMintInfo.data && (
          <View
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Text>Amount:</Text>
            <Text>
              {formatAmountAsDecimal(
                rewardMintInfo.data?.mintInfo.decimals,
                tokenData.stakeEntry && tokenData.stakeEntry.parsed.amount,
                rewardMintInfo.data?.mintInfo.decimals
              )}
            </Text>
          </View>
        )}
      {tokenData.stakeEntry?.pubkey && (
        <View
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Text>Boost:</Text>
          <Text>
            {(rewardDistributorData.data?.parsed.multiplierDecimals !==
              undefined &&
              formatAmountAsDecimal(
                rewardDistributorData.data?.parsed.multiplierDecimals || 0,
                rewardEntries.data
                  ? rewardEntries.data.find((entry) =>
                      entry.parsed.stakeEntry.equals(
                        tokenData.stakeEntry?.pubkey || PublicKey.default
                      )
                    )?.parsed.multiplier ||
                      rewardDistributorData.data.parsed.defaultMultiplier
                  : rewardDistributorData.data.parsed.defaultMultiplier,
                rewardDistributorData.data.parsed.multiplierDecimals
              ).toString()) ||
              1}
            x
          </Text>
        </View>
      )}
      {rewardDistributorData.data &&
        rewardDistributorData.data.parsed.rewardDurationSeconds &&
        rewardDistributorData.data.parsed.rewardDurationSeconds.gt(
          new BN(0)
        ) && (
          <>
            {tokenData.stakeEntry && rewardMintInfo.data && (
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Daily:</Text>
                <Text>
                  {formatAmountAsDecimal(
                    rewardMintInfo.data.mintInfo.decimals,
                    rewardsRate.data?.rewardsRateMap[
                      tokenData.stakeEntry.pubkey.toString()
                    ]?.dailyRewards || new BN(0), // max of 5 decimals
                    Math.min(rewardMintInfo.data.mintInfo.decimals, 5)
                  )}
                </Text>
              </View>
            )}
            {tokenData.stakeEntry && rewardMintInfo.data && (
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Claim:</Text>
                <Text>
                  {formatMintNaturalAmountAsDecimal(
                    rewardMintInfo.data.mintInfo,
                    rewards.data?.rewardMap[
                      tokenData.stakeEntry.pubkey.toString()
                    ]?.claimableRewards || new BN(0),
                    // max of 5 decimals
                    Math.min(rewardMintInfo.data.mintInfo.decimals, 5)
                  ).toLocaleString()}
                </Text>
              </View>
            )}
            {rewards.data &&
              rewards.data.rewardMap[
                tokenData.stakeEntry?.pubkey.toString() || ''
              ] &&
              rewardDistributorData.data?.parsed.rewardDurationSeconds.gte(
                new BN(60)
              ) && (
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Next rewards:</Text>
                  <Text>
                    {secondstoDuration(
                      rewards.data.rewardMap[
                        tokenData.stakeEntry?.pubkey.toString() || ''
                      ]?.nextRewardsIn.toNumber() || 0
                    )}
                  </Text>
                </View>
              )}
          </>
        )}
      {!!tokenData.stakeEntry?.parsed.cooldownStartSeconds &&
        !!stakePool?.parsed.cooldownSeconds && (
          <View
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Text>Cooldown:</Text>
            <Text>
              {tokenData.stakeEntry?.parsed.cooldownStartSeconds.toNumber() +
                stakePool.parsed.cooldownSeconds -
                UTCNow >
              0
                ? secondstoDuration(
                    tokenData.stakeEntry?.parsed.cooldownStartSeconds.toNumber() +
                      stakePool.parsed.cooldownSeconds -
                      UTCNow
                  )
                : 'Finished!'}
            </Text>
          </View>
        )}
      {!!stakePool?.parsed.minStakeSeconds &&
        !!tokenData.stakeEntry?.parsed.lastStakedAt && (
          <View
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Text>Min Time:</Text>
            <Text>
              {tokenData.stakeEntry?.parsed.lastStakedAt.toNumber() +
                stakePool.parsed.minStakeSeconds -
                UTCNow >
              0
                ? secondstoDuration(
                    tokenData.stakeEntry?.parsed.lastStakedAt.toNumber() +
                      stakePool.parsed.minStakeSeconds -
                      UTCNow
                  )
                : 'Satisfied'}
            </Text>
          </View>
        )}
    </View>
  )
}
