import { View, Text, TextInput, Pressable, Button } from "react-native";
import React, { useState } from "react";

export default function NewLaw({ route }) {
  //   const { theme } = route.params;

  const [theme, setTheme] = useState(
    route.params ? route.params.theme : "Select a theme"
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginVertical: 15, alignSelf: "center", fontSize: 20 }}>
        créer une nouvelle proposition
      </Text>

      <Text>{theme}</Text>
      <Button
        title={theme}
        onPress={() =>
          navigation.navigate("SelectTheme", {
            setTheme: setTheme,
          })
        }
      />

      <TextInput
        placeholder='Ta proposition de loi... Exemple : "Rendre les frites obligatoires à la cantine"'
        style={{ paddingHorizontal: 20, fontSize: 20 }}
      />

      <Pressable
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: "#F54776",
          width: "90%",
          alignSelf: "center",
          padding: 15,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Générer
        </Text>
      </Pressable>
    </View>
  );
}
