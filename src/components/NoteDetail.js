//here userHeaderHeight is accessible in v6 inside elements so install @react-navigation/elements
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHeaderHeight } from "@react-navigation/elements";
import moment from "moment";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../colorsComponent/colors";
import { useNotes } from "../context/NoteProvider";
import { RoundIconBtn } from "../CustComponent";
import NoteInputModal from "./NoteInputModal";

const formatDate = (ms) => {
  return moment(ms).format("MMMM D YYYY, h:ss a");
};

const NoteDetail = (props) => {
  // const { note } = props.route.params;
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are you Sure!",
      "This action will delete your Note Permanently!",
      [
        {
          text: "Delete",
          onPress: deleteNote,
        },
        {
          text: "No Thanks",
          onPress: () => {
            console.log("No thanks!");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    // we are checking if the notes coming from asyncStorage id and note from the state matches or not, if it matches then we are changing n.title with title coming from props.
    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isupdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };
  const handleClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      {/* <ImageBackground
        source={require("../assets/notebg2.jpeg")}
        flex={1}
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
      > */}
      <View style={{ backgroundColor: colors.Light, flex: 1 }}>
        <ScrollView
          contentContainerStyle
          style={[styles.container, { paddingTop: headerHeight }]}
        >
          <Text style={styles.time}>
            {note.isupdated
              ? `Updated At : ${formatDate(note.time)}`
              : `Created At : ${formatDate(note.time)}`}
          </Text>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>

        <View style={styles.btncontainer}>
          <RoundIconBtn
            antIconName="delete"
            style={{ backgroundColor: colors.Brown, marginBottom: 15 }}
            onPress={displayDeleteAlert}
          />
          <RoundIconBtn
            antIconName="edit"
            style={{ backgroundColor: colors.Green }}
            onPress={openEditModal}
          />
        </View>
        <NoteInputModal
          isEdit={isEdit}
          note={note}
          onClose={handleClose}
          onsubmit={handleUpdate}
          visible={showModal}
        />
        {/* </ImageBackground> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 30,
    color: colors.RosyVelvet,
    fontWeight: "bold",
    marginTop: 30,
  },

  desc: {
    fontSize: 17,
    marginTop: 20,
    color: colors.DarkPurple,
  },

  time: {
    textAlign: "right",
    fontSize: 12,
    color: colors.Dark,
  },

  btncontainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;
