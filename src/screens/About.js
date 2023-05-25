import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function About() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginVertical: 15, alignSelf: "center", fontSize: 20 }}>
        à propos
      </Text>
      <View style={{ marginHorizontal: 15 }}>
        <Text>FaisTaLoi a été développée par François Mari.</Text>
        <Text style={{ marginBottom: 10 }}>
          Les PPL générées par l'app peuvent présenter des informations
          inexactes.
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:francois.mari@outlook.com")}
          style={{
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Feather name={"external-link"} color={"#3192D8"} size={15} />
          <Text style={{ marginLeft: 2, color: "#3192D8" }}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://nifty-option-15c.notion.site/FaisTaLoi-mentions-l-gales-0412e98c04074be6a6148eeb1623330c"
            )
          }
          style={{
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Feather name={"external-link"} color={"#3192D8"} size={15} />
          <Text style={{ marginLeft: 2, color: "#3192D8" }}>
            Mentions légales
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", marginTop: 10 }}>
          ©️ François Mari, 2023
        </Text>
      </View>
    </View>
  );
}
