import { usePublicKey, View, Text, Button, Stack } from "react-xnft";
import { Nav } from "../common/Nav";
import { CONFIG } from "../config";

export function ClaimRewards() {
  return (
    <View
      style={{
        backgroundImage: "url(../assets/twitter-header.png)",
        backgroundRepeat: "no-repeat",
        height: "100%",
        backgroundColor: CONFIG.colors.background,
      }}
    >
      <View
        style={{
          background: CONFIG.colors.backgroundGradient,
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          height: "460px",
        }}
      ></View>
    </View>
  );
}

function Claim() {
  //   const estimatedRewards = useEstimatedRewards();
  return (
    <View>
      <View>
        <Header isDead={true} estimatedRewards={0} />
      </View>
    </View>
  );
}

function Header({ isDead, estimatedRewards }: any) {
  const publicKey = usePublicKey();

  const handleClaimRewards = () => {
    (async () => {})();
  };
  return (
    <View
      style={{
        marginTop: "255px",
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            color: CONFIG.colors.text,
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "150%",
          }}
        >
          Estimated Rewards
        </Text>
        <Text
          style={{
            fontSize: "40px",
            marginTop: "12px",
            textAlign: "center",
            fontWeight: 500,
            lineHeight: "24px",
            color: CONFIG.colors.text,
          }}
        >
          {estimatedRewards} DUST
        </Text>
        <Text
          style={{
            marginTop: "12px",
            color: CONFIG.colors.textSecondary,
            textAlign: "center",
          }}
        >
          {isDead ? 15 : 5} $DUST/day
        </Text>
      </View>
      <View
        style={{
          marginTop: "20px",
          width: "268px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Button
          onClick={handleClaimRewards}
          style={{
            flex: 1,
            background: "#FFEFEB",
            color: "#6100FF",
            border: "1px solid #000000",
            boxShadow: "4px 3px 0px #6100FF",
            borderRadius: "8px",
            width: "192px",
            height: "40px",
            fontWeight: 500,
          }}
        >
          Claim $DUST
        </Button>
      </View>
    </View>
  );
}
