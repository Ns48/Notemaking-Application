import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../colorsComponent/colors";
import { windowHeight, windowWidth } from "../constants";
import { RoundIconBtn } from "../CustComponent";

const Intro = ({ onFinish }) => {
  const [name, setName] = useState("");

  const handleOnChangeText = async (text) => {
    setName(text);
  };

  const handleSubmit = async () => {
    const user = { name: name }; // asigned name from usestate
    console.log(user);

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      if (onFinish) onFinish(); // Ensure onFinish is defined and callable
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/Login.jpeg")}
        flex={1}
        style={{ height: windowHeight, width: windowWidth }}
      >
        <StatusBar hidden />
        <View style={styles.container}>
          <Text style={styles.inputTitle}>Enter Your Name to Continue :</Text>

          <TextInput
            value={name}
            onChangeText={handleOnChangeText}
            placeholder="Enter Name"
            style={styles.textInput}
          />

          {typeof name === "string" && name.trim().length >= 3 ? (
            <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
          ) : null}
        </View>
      </ImageBackground>
    </>
  );
};

const width = Dimensions.get("window").width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    borderWidth: 1,
    borderColor: colors.Dark,
    color: colors.Dark,
    width,
    height: 60,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: colors.Beige,
  },

  inputTitle: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 5,
    marginTop: 100,
  },
});

export default Intro;
