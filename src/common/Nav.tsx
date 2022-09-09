import { Tab } from "react-xnft";
import { CardinalCrosshair } from "../assets/cardinalCrosshair";
import { CONFIG } from "../config";
import { ClaimRewards } from "../pages/ClaimRewards";
import { StakeUntake } from "../pages/StakeUnstake";

export function Nav() {
  return (
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
            if (route.name === "dust") {
              return <Tab.Icon element={<CardinalCrosshair fill={"#FFF"} />} />;
            } else {
              return <Tab.Icon element={<CardinalCrosshair fill={"#FFF"} />} />;
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
  );
}
