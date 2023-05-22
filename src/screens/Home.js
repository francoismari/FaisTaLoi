import { View, Text, SafeAreaView, FlatList, Pressable } from "react-native";
import React from "react";
import categories from "../../assets/data/categories";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text
        style={{
          color: "black",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 10,
          marginLeft: 15,
          marginBottom: 7,
        }}
      >
        Mes propositions
      </Text>
      <FlatList
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
      />

      <Pressable
        onPress={() => navigation.navigate("NewLaw")}
        style={{
          position: "absolute",
          bottom: 100,
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
        }}
      >
        <AntDesign name={"plus"} size={40} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
}
