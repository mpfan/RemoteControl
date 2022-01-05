import React, { useRef } from "react";
import {
  PanResponder,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from "react-native";

const VirtualMousePad = ({ socket }) => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        const data = {
          type: "mouse_move",
          data: {
            x: Math.floor(gestureState.dx / 2),
            y: Math.floor(gestureState.dy / 2),
          },
        };

        socket.emit("mouse_move", JSON.stringify(data));
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.mouseContainer}>
        <View style={styles.mousePad} {...panResponder.panHandlers}></View>
        <View style={styles.scrollContainer}>
          <Pressable
            style={styles.mouseButton}
            onPress={() =>
              socket.emit(
                "mouse_scroll",
                JSON.stringify({
                  type: "mouse_scroll",
                  data: { amount: 100 },
                })
              )
            }
          >
            <Text style={styles.text}>Up</Text>
          </Pressable>
          <Pressable
            style={styles.scrollButton}
            onPress={() =>
              socket.emit(
                "mouse_scroll",
                JSON.stringify({
                  type: "mouse_scroll",
                  data: { amount: -100 },
                })
              )
            }
          >
            <Text style={styles.text}>Down</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.scrollButton}
          onPress={() =>
            socket.emit(
              "mouse_click",
              JSON.stringify({ type: "mouse_click", data: { click: "left" } })
            )
          }
        >
          <Text style={styles.text}>Left Click</Text>
        </Pressable>
        <Pressable
          style={styles.mouseButton}
          onPress={() =>
            socket.emit(
              "mouse_click",
              JSON.stringify({ type: "mouse_click", data: { click: "right" } })
            )
          }
        >
          <Text style={styles.text}>Right Click</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  mousePad: {
    backgroundColor: "#264653",
    flexBasis: "80%",
  },
  mouseContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  scrollContainer: {
    display: "flex",
    flexBasis: "20%",
    height: "100%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexBasis: "30%",
  },
  mouseButton: {
    flexBasis: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#2a9d8f",
  },
  scrollButton: {
    flexBasis: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#2a9d8f",
  },
  text: {
    color: "#264653",
    fontSize: 16,
  },
});

export default VirtualMousePad;
