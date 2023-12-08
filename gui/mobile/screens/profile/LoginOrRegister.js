import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
const { height } = Dimensions.get("window");

const LoginOrRegister = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../../assets/images/loginregister.png")}
        />
        <View
          style={{
            paddingHorizontal: 40,
            paddingTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 35,
              color: "#D23F57",
              textAlign: "center",
            }}
          >
            Набирай средства за добри каузи лесно и забавно
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#222",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Само с няколко клика онлайн от твоя компютър или телефон
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 60,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              backgroundColor: "#D23F57",
              paddingVertical: 15,
              paddingHorizontal: 20,
              width: "48%",
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
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Влез
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              width: "48%",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#222",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Регистрирай се
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginOrRegister;
