import React from "react";
import { Text, Pressable, View, ImageBackground } from "react-native";
import styles from "./styles.js";
import { useNavigation } from "@react-navigation/native";
import { Card, Button, Badge } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Countdown from "../Countdown";

const Post = (props) => {
  const post = props.post;

  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate("Post", { postId: post.id });
  };

  return (
    <Pressable onPress={goToPostPage}>
      <Card style={styles.container}>
        <View style={styles.image}>
          <ImageBackground
            imageStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
            style={{ height: 200 }}
            source={{ uri: post.image }}
          >
            <Badge size={30} style={styles.badge}>
              {" "}
              <MaterialCommunityIcons name="finance" size={20} /> 3
            </Badge>
          </ImageBackground>
        </View>
        <Card.Content>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {post.title}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.analitycs}>
                <MaterialCommunityIcons
                  name="star"
                  size={20}
                  color={"#D23F57"}
                />{" "}
                {post.rating}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.countdown}>
                <Countdown endDate={post.endDate} />
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.startingBid}>
                <MaterialCommunityIcons name="gavel" size={20} /> Начална цена{" "}
                {"\n"}
                <Text style={styles.price}>{post.latestBid}лв</Text>
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.latestBid}>
                <MaterialCommunityIcons name="label" size={20} /> Текуща цена{" "}
                {"\n"}
                <Text style={styles.price}>{post.latestBid}лв</Text>
              </Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button labelStyle={{ color: "white" }} style={styles.bidButton}>
            Разгледай
          </Button>
        </Card.Actions>
      </Card>
    </Pressable>
  );
};

export default Post;
