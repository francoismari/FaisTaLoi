import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";

export default function LawInput({ lawText, setLawText }) {
  const inputRef = useRef(null);
  //   const [inputText, setInputText] = useState("");

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current.focus();
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 0,
          backgroundColor: "white",
          marginHorizontal: 15,
          marginTop: 10,
          borderRadius: 15,
        }}
      >
        {!lawText && (
          <Text
            style={{
              position: "absolute",
              top: 15,
              paddingHorizontal: 20,
              fontSize: 20,
              color: "gray",
            }}
          >
            Ta proposition de loi...{"\n"}Exemple : "Rendre les frites
            obligatoires à la cantine"
          </Text>
        )}
        <TextInput
          ref={inputRef}
          style={{ paddingHorizontal: 20, fontSize: 20, marginTop: 12 }}
          multiline
          numberOfLines={2}
          placeholder=""
          value={lawText}
          onChangeText={setLawText}
          maxLength={500}
          blurOnSubmit={true}
          // onSubmitEditing={handleDismissKeyboard}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
