import React, { useRef } from "react";
import { StyleSheet, View, TextInput, Button, Keyboard } from "react-native";

const VirtualKeyboard = ({ socket }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.keyboard}
        clearButtonMode="always"
        onKeyPress={(e) => {
          console.log(e.nativeEvent.key);

          const data = {
            type: "keyboard_key_press",
            data: {
              key: e.nativeEvent.key,
            },
          };

          socket.emit("keyboard_key_press", JSON.stringify(data));
        }}
        onSubmitEditing={() => {
          const data = {
            type: "keyboard_key_press",
            data: {
              key: "Enter",
            },
          };

          socket.emit("keyboard_key_press", JSON.stringify(data));
        }}
      ></TextInput>
      <Button color="#264653" title="Close" onPress={() => Keyboard.dismiss()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2a9d8f",
    height: "100%",
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
  },
  keyboard: {
    flexBasis: "80%",
    marginBottom: 4,
  },
});

export default VirtualKeyboard;
