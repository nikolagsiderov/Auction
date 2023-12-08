import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider } from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Tab as IndexTab } from "./screens/index/Tab";
import { Tab as ItemsTab } from "./screens/items/Tab";
import Login from "./screens/profile/Login";
import Register from "./screens/profile/Register";
import LoginOrRegister from "./screens/profile/LoginOrRegister";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Drawer.Navigator
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Излез"
              onPress={() => props.navigation.navigate("Login")}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="index"
        component={IndexTab}
        options={{
          drawerActiveBackgroundColor: "#f6f6f6",
          drawerLabelStyle: { color: "#D23F57" },
          drawerLabel: "Начало",
          drawerIcon: () => (
            <MaterialCommunityIcons name="home" color={"#D23F57"} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="items"
        component={ItemsTab}
        options={{
          drawerActiveBackgroundColor: "#f6f6f6",
          drawerLabelStyle: { color: "#D23F57" },
          drawerLabel: "Аукциони",
          drawerIcon: () => (
            <MaterialCommunityIcons name="cart" color={"#D23F57"} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        component={LoginOrRegister}
        options={{
          drawerActiveBackgroundColor: "#f6f6f6",
          drawerLabelStyle: { color: "#D23F57" },
          drawerLabel: "Профил",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color={"#D23F57"}
              size={26}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Startup() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Root" component={Root} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Startup />
      </NavigationContainer>
    </Provider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: "transparent", // Use transparent to disable the little highlighting oval
  },
};
