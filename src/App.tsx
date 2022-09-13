import ReactXnft, {
  Image,
  List,
  ListItem,
  Stack,
  Tab,
  Text,
  useNavigation,
  View,
} from "react-xnft";
import { stakePoolMetadatas } from "./config/config";
import { Home } from "./pages/Home";
import { Pool } from "./pages/Pool";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

export function App() {
  return (
    <Stack.Navigator
      style={{}}
      initialRoute={{ name: "home" }}
      options={({ route }) => {
        switch (route.name) {
          case "home":
            return {
              title: "Select Pool",
            };
          case "pool":
            return {
              title: route.props.stakePoolMetadata.displayName,
            };
          default:
            throw new Error("unknown route");
        }
      }}
    >
      <Stack.Screen
        name={"home"}
        component={(props: any) => <Home {...props} />}
      />
      <Stack.Screen
        name={"pool"}
        component={(props: any) => <Pool {...props} />}
      />
    </Stack.Navigator>
  );
}
