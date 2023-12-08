import { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { SafeAreaView, View, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      this.searchBar.focus();
    }
  }, [isFocused]);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Searchbar
          icon={() => (
            <MaterialCommunityIcons
              name="magnify"
              color={"#D23F57"}
              size={26}
            />
          )}
          placeholder="Потърси аукциони..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          ref={(searchBar) => {
            this.searchBar = searchBar;
          }}
          style={{
            height: 40,
            width: Dimensions.get("screen").width - 50,
            borderRadius: 30,
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Search;
