import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import colors from "../colorsComponent/colors";
import NoteDetail from "../components/NoteDetail";
import NoteProvider from "../context/NoteProvider";
import { RoundIconBtn } from "../CustComponent";

import Intro from "../screens/Intro";
import NoteScreen from "../screens/NoteScreen";

const Stack = createStackNavigator();

const Routes = () => {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
    console.log("REsult", result);
  };

  useEffect(() => {
    findUser();
  }, []);
  console.log(user, "user");

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{
            headerTitle: "",
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="NoteScreen" component={RenderNoteScreen} />
          <Stack.Screen
            name="NoteDetail"
            component={NoteDetail}
            options={({ navigation }) => ({
              headerTitle: "",
              headerTransparent: true,
              headerLeft: () => (
                <RoundIconBtn
                  antIconName="arrowleft"
                  style={styles.button}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          {/* <Stack.Screen name="Intro" component={Intro} /> */}
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="WelcomeScreen"
    //     screenOptions={{ headerTitle: "", headerTransparent: true }}
    //   >
    //     <>
    //       <Stack.Screen name="WelcomeScreen " component={WelcomeScreen} />
    //       <Stack.Screen name="Index" component={Index} />
    //       <Stack.Screen name="NoteScreen" component={NoteScreen} user={user} />
    //       <Stack.Screen name="NoteDetail" component={NoteDetail} />
    //     </>
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.Ocr,
    paddingTop: 8,
    marginLeft: 15,
    marginTop: 15,
    padding: 9,
  },
});

export default Routes;
