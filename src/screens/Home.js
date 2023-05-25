import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCategoryDetailsByName } from "../utils/getCategoryDetailsByName";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { resetProposition } from "../utils/resetProposition";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();

  const [propositions, setPropositions] = useState([]);
  const [scale, setScale] = useState(new Animated.Value(1));

  const isFocused = useIsFocused();

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.timing(scale, {
      toValue: 0.94,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    getPropositions();
  }, [isFocused]);

  const getPropositions = async () => {
    try {
      const savedPropositions = await AsyncStorage.getItem("propositions");
      if (savedPropositions !== null) {
        console.log(JSON.parse(savedPropositions));
        setPropositions(JSON.parse(savedPropositions));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const handleResetPropositions = () => {
    Alert.alert("Es-tu sûr ?", "Toutes tes propositions seront supprimées", [
      {
        text: "Annuler",
      },
      {
        text: "Réinitialiser",
        style: "destructive",
        onPress: () => {
          setPropositions([]);
          resetProposition();
        },
      },
    ]);
  };

  const renderProposition = ({ item }) => <PropositionItem item={item} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 10,
            marginLeft: 15,
            marginBottom: 10,
          }}
        >
          Mes propositions
        </Text>
        <TouchableOpacity
        style={{marginTop: 12, marginRight: 20}}
        onPress={() => navigation.navigate("About")}>
          <Feather name={"help-circle"} size={30} />
        </TouchableOpacity>
      </View>
      {/* <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <View
            style={{
              width: "92%",
              padding: 18,
              backgroundColor: item.color,
              alignSelf: "center",
              marginBottom: 10,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text>{item.emoji}</Text>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginLeft: 10,
                fontWeight: "500",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      /> */}

      {propositions.length ? (
        <FlatList
          data={propositions}
          renderItem={renderProposition}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={() => handleResetPropositions()}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text>Réinitialiser mes propositions</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 37 }}>🏛️</Text>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 50,
              fontWeight: "500",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Aucune proposition de loi ajoutée
          </Text>
        </View>
      )}

      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("NewLaw")}
      >
        <Animated.View
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 70,
            height: 70,
            borderRadius: 40,
            backgroundColor: "#F54776",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ scale: scale }],
          }}
        >
          <AntDesign name={"plus"} size={40} color={"white"} />
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
}

const PropositionItem = ({ item }) => {
  const themeDetails = getCategoryDetailsByName(item.theme);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert(
      "Proposition copiée",
      "La proposition a été copiée dans ton presse-papier !"
    );
  };

  return (
    <TouchableOpacity
      onPress={() => copyToClipboard(item.text)}
      style={{
        marginHorizontal: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
      <View
        style={{
          alignItems: "flex-start",
          marginTop: 5,
        }}
      >
        <View
          style={{
            padding: 7,
            backgroundColor: themeDetails.color,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white" }}>
            {themeDetails.emoji} {item.theme}
          </Text>
        </View>
      </View>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );
};
