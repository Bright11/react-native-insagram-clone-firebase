import { StyleSheet } from "react-native";

const detailsstyle = StyleSheet.create({
  detailsview: {
    flex: 1,
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: 250,
  },
  commentview: {
    flexDirection: "column",
    width: "100%",
  },

  commentholder: {
    marginTop: 20,
    flexDirection: "row",
    // alignItems: "center",
  },
  commentuserview: {
    flexDirection: "row",
    // alignItems: "center",
  },
  myprofile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  nametextuser: {
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Inter-Black",
  },
  commenttext: {
    // marginRight: 10,
    //paddingRight: 30,
    width: 260,
    fontFamily: "Inter-Black",
  },
  commentinputview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  commentinput: {
    width: "70%",
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    color: "#1A73E8",
  },
});

export default detailsstyle;
