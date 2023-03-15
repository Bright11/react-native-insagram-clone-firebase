import { StyleSheet } from "react-native";

const camerastyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameracontaner: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },

  image: {
   height:500
  },
  button_btn: {
    marginTop: 10,
  },
});

export default camerastyle;