import { usePublicKey, View, Text, Button, Stack } from "react-xnft";
import { useAllowedTokenDatas } from "../hooks/useAllowedTokenDatas";

export function StakeUntake() {
  const allowedTokens = useAllowedTokenDatas(false);
  console.log("---------", allowedTokens);
  return (
    <View style={{ height: "100%" }}>
      <Text>Stake</Text>
    </View>
  );
}
