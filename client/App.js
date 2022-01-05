import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { io } from "socket.io-client";

import VirtualMousePad from "./components/VritualMousePad";

const socket = io("http://192.168.0.191:5000");

const App = () => {
  const [message, setMessage] = useState("Not connected");

  const sendCommand = () => {
    socket.emit("remote_control_message", "Command from client");
  };

  return (
    <View style={styles.container}>
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
    height: "40%",
  },
});
