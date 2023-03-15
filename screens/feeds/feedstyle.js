import { StyleSheet } from "react-native";

const feedstle = StyleSheet.create({
  feedcontaine: {
    // backgroundColor: "red",
    marginTop: 30,
  },
  feedview: {
    margin: 20,
  },
  images: {
    width: "100%",
    height: 250,
  },
  feednameholder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "white",
  },
  feedownner: {
    fontSize: 20,
    fontFamily: "Inter-Black",
  },
  feedicons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  feediconsthree: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feediconpressthree: {
    marginRight: 20,
  },
  commentholder: {
    flexDirection: "row",
    marginTop: 20,
  },
  feedlogo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  feedinput: {
    // width: "100%",
    // marginLeft: 20,
    fontSize: 20,
  },
  commentview: {
    flex: 1,
    width: "100%",
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
});
export default feedstle;
