import { StyleSheet } from "react-native";

const topbarstyle = StyleSheet.create({
  feedcontainer: {
    marginTop: 40,
    width: "100%",
  },
  feedviewrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  feedinstagramname: {
    flexDirection: "row",
  },
  feedtopicons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feedpresicon: {
    marginRight: 10,
  },
  feedmessagenumber: {
    position: "absolute",
    top: 1,
    left: 22,
    backgroundColor: "red",
   width:25,
    borderRadius: 100,
    alignItems:'center'
  },
  feednumbertext: {
    color: "white",
    fontSize: 19,
  },
});

export default topbarstyle;
