import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const Search = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">test2</Text>
          <Text variant="bodyMedium">test2 content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Разгледай</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Search;
