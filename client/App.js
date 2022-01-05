import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { io } from "socket.io-client";

import VirtualKeyboard from "./components/VirtualKeyboard";
import VirtualMousePad from "./components/VirtualMousePad";

const socket = io("");

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.keyboardControlContainer}>
        <VirtualKeyboard socket={socket} />
      </View>
      <View style={styles.mouseControlContainer}>
        <VirtualMousePad socket={socket} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  mouseControlContainer: {
    width: "100%",
    flexBasis: "40%",
  },
  keyboardControlContainer: {
    width: "100%",
    flexBasis: "15%",
  },
});
