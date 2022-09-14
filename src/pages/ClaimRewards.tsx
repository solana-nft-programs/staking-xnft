import { View, Text, Button, Loading } from 'react-xnft'
import { RewardRate } from '../components/RewardRate'
import { RewardsAccumulated } from '../components/RewardsAccumulated'
import { StakePoolImage } from '../components/StakePoolImage'
import { useHandleClaimRewards } from '../handlers/useHandleClaimRewards'
import { useStakedTokenDatas } from '../hooks/useStakedTokenDatas'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'

export function ClaimRewards() {
  const { stakePoolMetadata } = useStakePoolMetadata()
  const handleClaimRewards = useHandleClaimRewards()
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
              stakePoolMetadata={stakePoolMetadata}
              width={150}
              style={{
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
