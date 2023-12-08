import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Register = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </View>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <TextInput
            mode="outlined"
            outlineColor="#fff"
            placeholder="Имейл"
            label="Имейл"
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            outlineColor="#fff"
            placeholder="Парола"
            label="Парола"
            style={styles.input}
            secureTextEntry={true}
          />
          <TextInput
            mode="outlined"
            outlineColor="#fff"
            placeholder="Потвърди парола"
            label="Потвърди парола"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#D23F57",
            marginVertical: 30,
            borderRadius: 30,
            shadowColor: "#D23F57",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Регистрирай се
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Login")}
          style={{
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "#222",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Вече имаш профил?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: 30,
          }}
        >
          <Text
            style={{
              color: "#D23F57",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Или използвай
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 0.5,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-google" color={"#DB4437"} size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 0.5,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-facebook" color={"#4267B2"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
