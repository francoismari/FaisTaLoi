import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import LawInput from "../components/NewLaw/LawInput";
import { convertToLawText } from "../utils/convertToLawText";
import * as Haptics from "expo-haptics";

export default function NewLaw({ route, navigation }) {
  //   const { theme } = route.params;

  const [inputText, setInputText] = useState("");
  const [theme, setTheme] = useState(
    route.params ? route.params.theme : "Choisir une catégorie"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(new Animated.Value(1));

  //   console.log(inputText)

  const handleSubmit = async () => {
    if (theme.name) {
      if (inputText !== "") {
        if (inputText.length <= 500) {
          setIsLoading(true);
          const response = await convertToLawText(inputText);
          // const response = "Voici mon texte de loi";
          setIsLoading(false);
          navigation.navigate("ViewLaw", { result: response, theme: theme }); // Assuming 'ResultPage' is a registered screen in your navigation stack
        } else {
          Alert.alert(
            "Oups",
            "La proposition ne peut pas faire plus de 500 caractères."
          );
        }
      } else {
        Alert.alert("Oups", "La proposition ne peut pas être vide.");
      }
    } else {
      Alert.alert(
        "Oups",
        "Tu dois renseigner un thème pour pouvoir générer une proposition de loi."
      );
    }
  };

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

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginVertical: 15, alignSelf: "center", fontSize: 20 }}>
        créer une nouvelle proposition
      </Text>

      {/* <Text>{theme.name}</Text> */}
      <TouchableOpacity
        style={{
          marginHorizontal: 15,
          padding: 15,
          backgroundColor: "white",
          borderRadius: 15,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          borderWidth: theme.color ? 1 : 0,
          borderColor: theme.color ? theme.color : null,
        }}
        onPress={() =>
          navigation.navigate("SelectTheme", {
            setTheme: setTheme,
          })
        }
      >
        <Text style={{ fontSize: 17 }}>
          {theme.emoji ? theme.emoji + " " : null}{" "}
          {theme.name ? theme.name : theme}
        </Text>

        <Entypo name={"chevron-right"} size={20} />
      </TouchableOpacity>

      <LawInput lawText={inputText} setLawText={setInputText} />

      <Animated.View style={{ transform: [{ scale: scale }] }}>
        {isLoading ? <IsLoadingCard /> : null}
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
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
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ActivityIndicator size={"small"} color="#fff" />
            </>
          ) : (
            <Text
              style={{
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Générer
            </Text>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
}

const IsLoadingCard = () => {
  const anecdotes = [
    "Le record du monde du plus long discours au Parlement français a été établi en 2006 par le député André Santini. Il a parlé pendant plus de cinq heures!",
    "La loi française sur la séparation de l'Église et de l'État de 1905 est toujours en vigueur aujourd'hui, bien qu'elle ait été modifiée à plusieurs reprises.",
    "En France, il est illégal de nommer un cochon 'Napoléon' en vertu de la loi sur les noms d'animaux.",
    "La première femme députée en France a été élue en 1945. Il s'agissait de Germaine Poinso-Chapuis.",
    "La Constitution de la Cinquième République française a été approuvée par référendum en 1958.",
    "En 1791, la France a été le premier pays à introduire une loi sur le droit d'auteur, connue sous le nom de Loi de Chapelier.",
    "Le Code civil français, également connu sous le nom de Code Napoléon, a été adopté en 1804 et a influencé de nombreux systèmes juridiques à travers le monde.",
    "L'Assemblée nationale française est constituée de 577 députés.",
    "Les sessions ordinaires du Parlement français commencent le premier jour ouvrable d'octobre et se terminent le dernier jour de juin de l'année suivante.",
    "La devise 'Liberté, Égalité, Fraternité' est inscrite dans la Constitution française de 1958.",
  ];

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    return anecdotes[randomIndex];
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 110,
        alignSelf: "center",
        marginHorizontal: 18,
        backgroundColor: "#62A8DA",
        borderRadius: 20,
        padding: 15,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Ta PPL se génère ⏳
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        cela peut prendre une vingtaine de secondes...
      </Text>
      <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
        {getRandomAnecdote()}
      </Text>
    </View>
  );
};
