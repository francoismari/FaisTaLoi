import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import NewLaw from "./screens/NewLaw";
import SelectTheme from "./screens/SelectTheme";
import ViewLaw from "./screens/ViewLaw";
import About from "./screens/About";

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="NewLaw"
          component={NewLaw}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectTheme"
          component={SelectTheme}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewLaw"
          component={ViewLaw}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
