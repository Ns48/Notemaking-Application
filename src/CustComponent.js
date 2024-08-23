import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "./colorsComponent/colors";

export const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 20}
      color={color || colors.Light}
      style={[roundIconBtnStyles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const roundIconBtnStyles = StyleSheet.create({
  icon: {
    backgroundColor: colors.Primary,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

export const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    // <View style={[searchBarStyles.container, { ...containerStyle }]}>
    <View style={searchBarStyles.container}>
      <AntDesign name="search1" size={20} color="black" />
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={searchBarStyles.searchBar}
        placeholder="Search here.."
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.Primary}
          onPress={onClear}
          style={searchBarStyles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const searchBarStyles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginTop: 30,
    flexDirection: "row",
    backgroundColor: colors.PastelCornSilk,
    borderRadius: 40,
    paddingLeft: 30,
    height: 45,
    paddingTop: 4,
    alignItems: "center",
  },
  searchBar: {
    borderColor: colors.Beige,
    paddingLeft: 10,
  },
  clearIcon: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
  },
});

// export const CustomBackButton = ({ onPress }) => (
//   <TouchableOpacity onPress={onPress} style={styles.backButton}>
//     <MaterialIcons name="arrow-back" size={24} color={colors.Dark} />
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   backButton: {
//     backgroundColor: colors.Light,
//     borderRadius: 20,
//     padding: 8,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

export const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AntDesign name="frowno" size={50} color="black" />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "800" }}>
        Result Not Found{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    zIndex: -1,
  },
});
