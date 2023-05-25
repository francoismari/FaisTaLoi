import React from "react";
import { Button, FlatList, Pressable, Text, View } from "react-native";
import categories from "../../assets/data/categories";

const SelectTheme = ({ route, navigation }) => {
  const { setTheme } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {/* {categories.map((theme, index) => (
        <Button key={index} title={theme.name} />
      ))} */}

      <Text style={{ marginVertical: 15, alignSelf: "center", fontSize: 20 }}>
        choisir une catégorie
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50, marginTop: 10 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setTheme(item);
              navigation.goBack();
            }}
            style={{
              width: "92%",
              padding: 18,
              backgroundColor: "white",
              borderColor: item.color,
              borderWidth: 2,
              alignSelf: "center",
              marginBottom: 10,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
            //   shadowColor: "#000",
            //   shadowOffset: {
            //     width: 0,
            //     height: 2,
            //   },
            //   shadowOpacity: 0.25,
            //   shadowRadius: 3.84,

            //   elevation: 5,
            }}
          >
            <Text>{item.emoji}</Text>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                marginLeft: 10,
                fontWeight: "500",
                // shadowColor: "#000",
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3.84,

                // elevation: 5,
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default SelectTheme;
