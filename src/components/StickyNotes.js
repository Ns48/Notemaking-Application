import { useFonts } from "expo-font";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../colorsComponent/colors";

export const StickyNote = ({ item, onPress }) => {
  const { title, desc } = item;

  const [loaded, error] = useFonts({
    LovedbytheKingRegular: require("../assets/fonts/LovedbytheKing-Regular.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <TouchableOpacity onPress={onPress} show>
        <View style={styles.container}>
          <View style={styles.stickyNote}>
            <View style={styles.stickyNoteBefore} />
            <View style={styles.stickyNoteAfter} />
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>

            <Text
              numberOfLines={2}
              style={{ fontFamily: "LovedbytheKingRegular" }}
            >
              {desc}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const width = Dimensions.get("window").width - 40;
const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,

    padding: 6,
  },

  title: {
    fontSize: 15,
    color: colors.Dark,
    textAlign: "center",
    fontWeight: "800",
  },

  stickyNote: {
    height: 150,
    padding: 2,

    position: "relative",
    backgroundColor: colors.SeaShel,

    marginBottom: 10,
    paddingTop: 50,
    borderBottomLeftRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 9, height: 0 },
    shadowOpacity: 0.42,
    shadowRadius: 12,
  },
  stickyNoteBefore: {
    position: "absolute",
    backgroundColor: "rgba(108, 212, 255, 0.6)",
    width: 80,
    height: 30,
    left: "65%",
    top: -15,
    transform: [{ translateX: -60 }, { rotate: "3deg" }],
  },
  stickyNoteAfter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopRightRadius: 15,
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,

    borderColor: "#989d9e",

    borderWidth: 12,
    borderStyle: "solid",
    transform: [{ rotate: "180deg" }],
  },
});
