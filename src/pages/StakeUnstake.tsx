import { View, Text, Button, Image } from "react-xnft";
import { useStakedTokenDatas } from "../hooks/useStakedTokenDatas";
import { useAllowedTokenDatas } from "../hooks/useAllowedTokenDatas";

export function StakeUntake() {
  const allowedTokens = useAllowedTokenDatas(true);
  const stakedTokenDatas = useStakedTokenDatas();
  console.log("-----", stakedTokenDatas);
  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          padding: "20px",
          backgroundImage:
            "url(https://github.com/cardinal-labs/cardinal-staking-xnft/raw/master/assets/background.png)",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            marginTop: "8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {allowedTokens.data?.map((tokenData) => {
            return (
              <View>
                <Button
                  key={tokenData.metaplexData?.pubkey.toString()}
                  // onClick={() => clickGod(g)}
                  style={{
                    padding: 0,
                    width: "157.5px",
                    height: "157.5px",
                    borderRadius: "6px",
                  }}
                >
                  <Image
                    src={tokenData.metadata?.parsed.image}
                    style={{
                      borderRadius: "6px",
                      width: "157.5px",
                    }}
                  />
                </Button>
                <View
                  style={{
                    marginTop: "3px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "12px",
                      lineHeight: "19.08px",
                    }}
                  >
                    {tokenData.metaplexData?.data.data.name}
                  </Text>
                  <View style={{ display: "flex" }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginRight: "2px",
                      }}
                    >
                      {/* {g.isStaked ? <LockIcon /> : <UnlockIcon />} */}
                    </View>
                    <Text
                      style={{
                        fontSize: "12px",
                        lineHeight: "19.08px",
                      }}
                    >
                      Stake
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          {stakedTokenDatas.data?.map((tokenData) => {
            return (
              <View>
                <Button
                  key={tokenData.metaplexData?.pubkey.toString()}
                  // onClick={() => clickGod(g)}
                  style={{
                    padding: 0,
                    width: "157.5px",
                    height: "157.5px",
                    borderRadius: "6px",
                  }}
                >
                  <Image
                    src={tokenData.metadata?.parsed.image}
                    style={{
                      borderRadius: "6px",
                      width: "157.5px",
                    }}
                  />
                </Button>
                <View
                  style={{
                    marginTop: "3px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>{tokenData.metaplexData?.data.data.name}</Text>
                  <Button>Stake</Button>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
