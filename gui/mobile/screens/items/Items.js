import * as React from "react";
import { ScrollView } from "react-native";
import Post from "../../components/PostCarouselItem/Post";

const Items = () => {
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

  const post2 = {
    id: 1,
    image: "https://ezine.bg/files/lib/500x350/carvuli.jpg",
    endDate: new Date().getTime() + 1000000,
    title: "Цървули",
    startingBid: 10,
    latestBid: 35,
    bidsCount: 7,
    rating: 3.95,
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Post post={post} />
      <Post post={post} />
      <Post post={post} />
      <Post post={post} />
    </ScrollView>
  );
};

export default Items;
