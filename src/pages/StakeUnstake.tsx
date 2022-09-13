import { View, Text, Button, Image, Loading } from "react-xnft";
import { useStakedTokenDatas } from "../hooks/useStakedTokenDatas";
import { useAllowedTokenDatas } from "../hooks/useAllowedTokenDatas";

export function StakeUntake() {
  const allowedTokens = useAllowedTokenDatas(true);
  const stakedTokenDatas = useStakedTokenDatas();
  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          padding: "5px",
          width: "100%",
          height: "100%",
        }}
      >
        {!allowedTokens.isFetched || !stakedTokenDatas.isFetched ? (
          <View
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              marginTop: "8px",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "calc(100% - 10px)",
                  borderRadius: "6px",
                  minHeight: "150px",
                  minWidth: "150px",
                  background: "#111",
                }}
              >
                <Loading />
              </View>
            </View>
            <View
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "calc(100% - 10px)",
                  borderRadius: "6px",
                  minHeight: "150px",
                  minWidth: "150px",
                  background: "#111",
                }}
              >
                <Loading />
              </View>
            </View>
            <View
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "calc(100% - 10px)",
                  borderRadius: "6px",
                  minHeight: "150px",
                  minWidth: "150px",
                  background: "#111",
                }}
              >
                <Loading />
              </View>
            </View>
            <View
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "calc(100% - 10px)",
                  borderRadius: "6px",
                  minHeight: "150px",
                  minWidth: "150px",
                  background: "#111",
                }}
              >
                <Loading />
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              marginTop: "8px",
              justifyContent: "space-between",
            }}
          >
            {allowedTokens.data?.map((tokenData) => {
              return (
                <View
                  style={{
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src={tokenData.metadata?.parsed.image}
                    style={{
                      borderRadius: "6px",
                      maxWidth: "calc(100% - 10px)",
                      minHeight: "150px",
                      minWidth: "150px",
                    }}
                  />
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
                    <Text>{tokenData.metaplexData?.parsed.data.name}</Text>
                    <Button>Unstake</Button>
                  </View>
                </View>
              );
            })}
            {stakedTokenDatas.data?.map((tokenData) => {
              return (
                <View
                  style={{
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src={tokenData.metadata?.parsed.image}
                    style={{
                      borderRadius: "6px",
                      maxWidth: "calc(100% - 10px)",
                      minHeight: "150px",
                      minWidth: "150px",
                    }}
                  />
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
                    <Text>{tokenData.metaplexData?.parsed.data.name}</Text>
                    <Button>Unstake</Button>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}
