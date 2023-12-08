import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import IndexInner from "../screens/index/IndexInner";
import Search from "../screens/Search";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const NullComponent = () => {
  return null;
};

const BottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="IndexInner"
      activeColor="#D23F57"
      barStyle={{ backgroundColor: "#fff", height: 90 }}
    >
      <Tab.Screen
        name="IndexInner"
        component={IndexInner}
        options={{
          tabBarLabel: "Начало",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Търсене",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="IndexInner3"
        component={Search}
        options={{
          tabBarLabel: "Добави",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="more"
        component={NullComponent}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        options={{
          tabBarLabel: "Още",
          tabBarIcon: () => (
            <Ionicons name={"md-menu"} size={26} color={"#D23F57"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
