import * as React from "react";
import { View, ImageBackground, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import Post from "../../components/PostCarouselItem/Post";
import { ScrollView } from "react-native-gesture-handler";

const Index = ({ navigation: { navigate } }) => {
  const post = {
    id: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Cyrvul.jpg",
    endDate: new Date().getTime(),
    title: "Цървули",
    startingBid: 10,
    latestBid: 35,
    bidsCount: 33,
    rating: 4.52,
  };

  return (
    <ScrollView>
      <View>
        <Pressable
          style={styles.searchButton}
          onPress={() => navigate("Search")}
        >
          <MaterialCommunityIcons name="magnify" color={"#D23F57"} size={26} />
          <Text style={styles.searchButtonText}>Потърси аукциони...</Text>
        </Pressable>

        <ImageBackground
          source={require("../../assets/images/wallpaper.jpg")}
          style={styles.image}
        >
          <Text style={styles.title}>Набирайте лесно и забавно</Text>
          <Text style={styles.titleKeyword}>Дарения</Text>
          <Text style={styles.titleFooter}>
            Първият, в България, онлайн благотворителен аукцион
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => console.warn("Explore Btn clicked")}
          >
            <Text style={styles.buttonText}>Разгледай</Text>
          </Pressable>
        </ImageBackground>
      </View>

      <View style={{ flex: 1, padding: 20 }}>
        <Post post={post} />
        <Post post={post} />
        <Post post={post} />
        <Post post={post} />
      </View>
    </ScrollView>
  );
};

export default Index;
