import { StyleSheet } from "react-native";

const messagestyle = StyleSheet.create({
  sender: {
    backgroundColor: "#C3D9A7",
    paddingLeft: 50,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  receiver: {
    paddingLeft: 10,
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  messageinput: {
    width: "90%",
  },
  senderview: {
    flexDirection: "row",
    alignItems: "center",
    bottom: 0,
  },
  messageicon: {
    backgroundColor: "#459189",
    padding: 15,
  },
});

export default messagestyle;
