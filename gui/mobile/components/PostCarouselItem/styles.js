import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bidButton: {
    backgroundColor: "#D23F57",
    color: "#fff",
    margin: 10,
  },
  container: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 30,
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginLeft: 15,
    paddingBottom: 10,
    paddingRight: 10,
    alignContent: "center",
  },
  countdown: {
    marginVertical: 10,
    color: "#5b5b5b",
    fontSize: 20,
    color: "#D23F57",
    letterSpacing: 5,
  },
  analitycs: {
    marginTop: 15,
    textAlign: "right",
    color: "#5b5b5b",
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
  },
  latestBid: {
    marginVertical: 10,
    textAlign: "right",
  },
  oldPrice: {
    color: "#5b5b5b",
    textDecorationLine: "line-through",
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
  },
  startingBid: {
    marginVertical: 10,
    color: "#5b5b5b",
  },
});

export default styles;
