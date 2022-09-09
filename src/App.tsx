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
    <View
      className="bg-red"
      style={{ height: "100%", backgroundColor: CONFIG.colors.background }}
    >
      <Tab.Navigator
        style={{
          backgroundColor: CONFIG.colors.background,
          borderTop: "none",
        }}
        options={({ route }) => {
          return {
            tabBarActiveTintColor: "#555",
            tabBarInactiveTintColor: "#888",
            tabBarIcon: ({ focused }) => {
              const color = focused
                ? CONFIG.colors.activeTab
                : CONFIG.colors.inactiveTab;
              if (route.name === "claim") {
                return (
                  <Tab.Icon element={<CardinalCrosshair fill={"#FFF"} />} />
                );
              } else {
                return (
                  <Tab.Icon element={<CardinalCrosshair fill={"#FFF"} />} />
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
