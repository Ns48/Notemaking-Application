import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RoundIconBtn } from "../CustComponent";
import colors from "../colorsComponent/colors";

const NoteInputModal = ({ visible, onClose, onsubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, SetDesc] = useState("");
  const [inputHeight, setInputHeight] = useState(60);

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      SetDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") SetDesc(text);

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    if (wordCount > 500) {
      setInputHeight(600); // Adjust this value as needed
    }
  };

  //if will not empty setTitile and SetDes then it will remain as it is whenever will open the input Modal, we need to emptied it before closing
  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    if (isEdit) {
      //For edit the same note again
      onsubmit(title, desc, Date.now());
    } else {
      onsubmit(title, desc);
      setTitle("");
      SetDesc("");
    }
    onClose();
    return;
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      SetDesc("");
    }
    onClose();
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      marginTop: 20,
    },

    input: {
      borderBottomWidth: 1,
      borderBottomColor: isEdit ? colors.Beige : colors.Brown,
      fontSize: 15,
      color: colors.Dark,
    },

    title: {
      height: isEdit ? 25 : 60,
      marginBottom: isEdit ? 4 : 20,
      fontWeight: "bold",
      color: colors.Dark,
      fontSize: isEdit ? 20 : null,
    },

    desc: {
      height: isEdit ? 550 : inputHeight,
      color: colors.Dark,
    },

    modalBG: {
      flex: 1,
      zIndex: -1,
    },

    btnContainer: {
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: 15,
    },
  });

  return (
    <>
      <StatusBar hidden />

      <Modal visible={visible} animationType="fade">
        <View style={{ backgroundColor: "#ffebcd", flex: 1 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.btnContainer}>
              <RoundIconBtn
                size={15}
                antIconName="arrowleft"
                onPress={closeModal}
                color={colors.Dark}
                style={{
                  backgroundColor: colors.PastelCornSilk,
                  marginRight: 40,
                  marginTop: 10,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: colors.BrownShades,
                padding: 15,
                paddingRight: 30,
                paddingLeft: 30,
                borderRadius: 70,
                marginRight: 35,
                marginTop: 15,
                borderRadius: 20,
              }}
            >
              {isEdit ? (
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.DarkPurple,
                    textAlign: "center",
                  }}
                >
                  𝚄𝚙𝚍𝚊𝚝𝚎 𝚈𝚘𝚞𝚛 𝙽𝚘𝚝𝚎𝚜
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.DarkPurple,
                    textAlign: "center",
                  }}
                >
                  𝙲𝚛𝚎𝚊𝚝𝚎 𝚈𝚘𝚞𝚛 𝙽𝚘𝚝𝚎𝚜
                </Text>
              )}
            </View>
          </View>

          <View style={styles.container}>
            <TextInput
              value={title}
              onChangeText={(text) => handleOnChangeText(text, "title")}
              placeholder="𝚃𝚒𝚝𝚕𝚎"
              style={[styles.input, styles.title]}
            />
            {isEdit ? (
              <ScrollView>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  keyboardVerticalOffset={100}
                  behavior={"position"}
                >
                  <TextInput
                    value={desc}
                    multiline
                    placeholder="𝙽𝚘𝚝𝚎𝚜"
                    style={[styles.input, styles.desc]}
                    onChangeText={(text) => handleOnChangeText(text, "desc")}
                  />
                </KeyboardAvoidingView>
              </ScrollView>
            ) : (
              <TextInput
                value={desc}
                multiline
                placeholder="𝙽𝚘𝚝𝚎𝚜"
                style={[styles.input, styles.desc]}
                onChangeText={(text) => handleOnChangeText(text, "desc")}
              />
            )}

            <View style={styles.btnContainer}>
              <RoundIconBtn
                size={15}
                antIconName="check"
                onPress={handleSubmit}
                style={{ backgroundColor: colors.DarkSalmon }}
              />
              {title.trim() || desc.trim() ? (
                <RoundIconBtn
                  size={20}
                  style={{ marginLeft: 15, backgroundColor: colors.DarkSalmon }}
                  antIconName="close"
                  onPress={closeModal}
                />
              ) : null}
            </View>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;
