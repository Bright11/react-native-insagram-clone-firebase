import { StyleSheet } from "react-native";

const statusstyle = StyleSheet.create({
  container: {
    width: "100%",
  },
  statusview: {
    margin: 10,
  },
  images: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red",
  },
  statusname: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter-Black",
  },
});

export default statusstyle;
