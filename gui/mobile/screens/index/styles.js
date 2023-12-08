import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
  },
  titleKeyword: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
  },
  titleFooter: {
    marginTop: 15,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
  },
  button: {
    backgroundColor: "#fff",
    width: 150,
    height: 40,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  searchButton: {
    backgroundColor: "#fff",
    height: 40,
    width: Dimensions.get("screen").width - 50,
    borderRadius: 30,
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 60,
    zIndex: 100,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
