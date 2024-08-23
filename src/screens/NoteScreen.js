import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NotFound, RoundIconBtn, SearchBar } from "../CustComponent";
import colors from "../colorsComponent/colors";
import NoteInputModal from "../components/NoteInputModal";
import { StickyNote } from "../components/StickyNotes";
import { useNotes } from "../context/NoteProvider";

const NoteScreen = ({ user, navigation }) => {
  // need to pass {...props} otherwise will not be able to use navigation inside notescreen, b/caz we are accessing navigation props from stack navigator inside Navigation container that we are passing to RenderNotes
  const [greet, setGreet] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  //useNotes comes from ContextProvider
  const { notes, setNotes, findNotes } = useNotes();
  const [resultNotFound, setResultNotFound] = useState(false);

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
    console.log(hrs);
  };

  useEffect(() => {
    findGreet();
  }, []);

  // if (!user.name) return <Intro onFinish={findUser} />;

  //This handleOnSubmit function will call when a user submits a form or create a newnote, passing the 'title'& 'desc' as parameters/
  //This function is useful in scenarios where you need to persistently store user-generated content locally on a mobile device, ensuring that the data is retained across app sessions.

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  //here we are passing note as an object argument and passing as a route parameter i.e{note} when navigating to the Notedetail Screen, it allows to pass data of note
  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      return await findNotes();
    }
    const filteredNotes = notes.filter((note) => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.Light} />

      <View style={{ backgroundColor: colors.BlueShades, flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>
              {`Good ${greet}${user ? `, ${user.name} :)` : ""}`}
            </Text>
            {notes.length ? (
              <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                onClear={handleOnClear}
              />
            ) : null}

            {/* Here we are passing notes from useState to data then it passes to renderItem to re-render the notes component with the help of the id we extracted from the item of esch data of notes we passed first in FlatList*/}
            {resultNotFound ? (
              <NotFound />
            ) : (
              <FlatList
                data={notes}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <StickyNote onPress={() => openNote(item)} item={item} />
                )}
                showsVerticalScrollIndicator={false}
              />
            )}

            {!notes.length ? (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.emptyHeaderContainer,
                ]}
              >
                <Text style={styles.emptyHeader}>Add Notes</Text>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName="plus"
          style={styles.addBtn}
        />
        <NoteInputModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onsubmit={handleOnSubmit}
        />
        {/* </ImageBackground> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.Dark,
  },

  container: {
    paddingHorizontal: 25,
    flex: 1,
    marginTop: 25,
  },

  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
    color: colors.Light,
  },

  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },

  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default NoteScreen;
