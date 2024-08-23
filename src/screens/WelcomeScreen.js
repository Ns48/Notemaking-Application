import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { windowHeight, windowWidth } from "../constants";

const WelcomeScreen = ({ navigation }) => {
  const timer = async () => {
    await new Promise((r) => setTimeout(r, 4000));
    navigation.navigate("Intro");
  };

  useEffect(() => {
    timer();
  }, []);

  return (
    <>
      <ImageBackground
        source={require("../assets/bgimg.jpeg")}
        flex={1}
        style={{ height: windowHeight, width: windowWidth }}
      >
        <View style={styles.container}>
          <LottieView
            style={{ height: 250, width: 150 }}
            autoPlay
            source={require("../assets/welcome.json")}
          />
          <Text style={styles.text}> ᒍOTTIᑎG ...</Text>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    flexDirection: "row",
    rowGap: 2,
  },

  text: {
    textAlign: "center",
    fontSize: 25,
  },
});

export default WelcomeScreen;
