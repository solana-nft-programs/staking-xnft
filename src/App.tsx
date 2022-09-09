import ReactXnft, { Tab, Text, View } from "react-xnft";
import { CardinalCrosshair } from "./assets/cardinalCrosshair";
import { CONFIG } from "./config";
import { ClaimRewards } from "./pages/ClaimRewards";
import { StakeUntake } from "./pages/StakeUnstake";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

export function App() {
  return (
    <View style={{ height: "100%" }}>
      <Tab.Navigator
        style={{
          backgroundColor: "#111",
          borderTop: "none",
        }}
        options={({ route }) => {
          return {
            tabBarActiveTintColor: "#401a2f",
            tabBarInactiveTintColor: "#111",
            tabBarIcon: () => {
              if (route.name === "claim") {
                return (
                  <Tab.Icon
                    element={
                      <View>
                        <Text>Claim</Text>
                      </View>
                    }
                  />
                );
              } else {
                return (
                  <Tab.Icon
                    element={
                      <View>
                        <Text>Stake</Text>
                      </View>
                    }
                  />
                );
              }
            },
          };
        }}
      >
        <Tab.Screen
          name="claim"
          disableLabel={true}
          component={() => <ClaimRewards />}
        />
        <Tab.Screen
          name="stake"
          disableLabel={true}
          component={() => <StakeUntake />}
        />
      </Tab.Navigator>
    </View>
  );
}
