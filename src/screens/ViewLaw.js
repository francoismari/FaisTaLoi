import { View, Text, Pressable, ScrollView, Share } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import { addProposition } from "../utils/addProposition";

export default function ViewLaw({ route, navigation }) {
  const { result, theme } = route.params;

  const [dialogVisible, setDialogVisible] = useState(false);
  const [propositionName, setPropositionName] = useState("");

  const handleAddProposition = async () => {
    if (propositionName !== "") {
      const propositionData = {
        name: propositionName,
        theme: theme.name,
        text: result,
      };

      await addProposition(propositionData);

      navigation.navigate("Home");
    }
  };

  const handleShareProposition = () => {
    Share.share({message: result})
  }

  return (
    <View style={{ flex: 1 }}>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Renseigner un nom</Dialog.Title>
        <Dialog.Input
          placeholder="Nom de la proposition"
          value={propositionName}
          onChangeText={setPropositionName}
        />
        <Dialog.Button label="Annuler" onPress={() => setVisible(false)} />
        <Dialog.Button label="Ajouter" onPress={() => handleAddProposition()} />
      </Dialog.Container>

      <Text style={{ marginVertical: 15, alignSelf: "center", fontSize: 20 }}>
        ma proposition de loi
      </Text>

      <Pressable
        onPress={() => setDialogVisible(true)}
        style={{
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "#F54776",
          width: "90%",
          alignSelf: "center",
          padding: 10,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Entypo name={"plus"} size={20} color={"#F54776"} />
        <Text
          style={{
            color: "#F54776",
            textTransform: "uppercase",
            fontWeight: "bold",
            marginLeft: 2,
          }}
        >
          Ajouter à mes propositions
        </Text>
      </Pressable>

      <ScrollView
      contentContainerStyle={{paddingBottom: 150}}
      >
        <Text style={{ marginHorizontal: 15, fontSize: 20 }}>{result}</Text>
      </ScrollView>

      <Pressable
      onPress={() => handleShareProposition()}
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
          Partager à mon député
        </Text>
      </Pressable>
    </View>
  );
}
