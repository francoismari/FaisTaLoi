import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { convertToLawText } from "./src/utils/convertToLawText";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigation";

export default function App() {
  const [lawText, setLawText] = useState("");

  const handleClick = async () => {
    const text = "Rendre obligatoire les frites à la cantine";
    const convertedText = await convertToLawText(text);
    console.log("CONVERTED TEXT : ", convertedText);
    setLawText(convertedText);
  };

  // useEffect(() => {
  //   handleClick();
  // }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
