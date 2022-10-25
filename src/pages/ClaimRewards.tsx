import { View, Loading } from 'react-xnft'
import { RewardRate } from '../components/RewardRate'
import { RewardsAccumulated } from '../components/RewardsAccumulated'
import { StakePoolImage } from '../components/StakePoolImage'
import { Text } from '../common/Text'
import { useHandleClaimRewards } from '../handlers/useHandleClaimRewards'
import { useStakedTokenDatas } from '../hooks/useStakedTokenDatas'
import { Button } from '../common/Button'
import { useStakePool } from '../hooks/useStakePool'

export function ClaimRewards() {
  const handleClaimRewards = useHandleClaimRewards()
  const stakePool = useStakePool()
  const stakedTokenDatas = useStakedTokenDatas()
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View
        style={{
          marginTop: '15vh',
        }}
      >
        <View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
            }}
          >
            <StakePoolImage
              stakePool={stakePool}
              width={150}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0px auto',
              }}
            />
          </View>
          <Text
            style={{
              marginTop: '12px',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            <RewardsAccumulated size={30} />
          </Text>
          <Text
            style={{
              marginTop: '12px',
              textAlign: 'center',
            }}
          >
            <RewardRate />
          </Text>
        </View>
        <View
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Button
            onClick={() => {
              stakedTokenDatas.data &&
                handleClaimRewards.mutate({ tokenDatas: stakedTokenDatas.data })
            }}
            style={{}}
          >
            {handleClaimRewards.isLoading ? (
              <Loading
                style={{
                  height: '25px',
                  width: '25px',
                }}
              />
            ) : (
              'Claim'
            )}
          </Button>
        </View>
      </View>
    </View>
  )
}
