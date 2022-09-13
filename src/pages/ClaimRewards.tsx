import { View, Text, Button } from 'react-xnft'
import { RewardRate } from '../components/RewardRate'
import { RewardsAccumulated } from '../components/RewardsAccumulated'
import { StakePoolImage } from '../components/StakePoolImage'
import { useStakePoolMetadata } from '../providers/StakePoolMetadataProvider'

export function ClaimRewards() {
  const { stakePoolMetadata } = useStakePoolMetadata()
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
            <StakePoolImage stakePoolMetadata={stakePoolMetadata} width={150} />
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
          <Button onClick={() => {}} style={{}}>
            Claim
          </Button>
        </View>
      </View>
    </View>
  )
}
