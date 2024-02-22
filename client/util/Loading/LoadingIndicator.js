import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingIndicator = ({loading}) => {
  return (
    <View style={[styles.container,loading ? "" : styles.hide]}>
      <ActivityIndicator color={"#49aefc"} size="large" />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right:0,
        bottom: 0,
        flex: 1,
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        justifyContent: "center",
    },
    hide: {
        display: "none"
    }
});
