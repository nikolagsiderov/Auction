import * as React from "react";
import ItemsBottomNav from "../../components/ItemsBottomNav";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const Stack = createStackNavigator();

export const Tab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ItemsBottomNav"
        component={ItemsBottomNav}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => (
            <Ionicons
              name={"md-menu"}
              size={24}
              color={"#D23F57"}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerRight: () => (
            <>
              <View style={styles.container}>
                <TouchableOpacity style={{ marginRight: 10 }}>
                  <MaterialCommunityIcons
                    name="magnify"
                    color={"#D23F57"}
                    size={26}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10 }}>
                  <MaterialCommunityIcons
                    name="account"
                    color={"#D23F57"}
                    size={26}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10 }}>
                  <MaterialCommunityIcons
                    name="plus"
                    color={"#D23F57"}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
  },
});
