import AsyncStorage from "@react-native-async-storage/async-storage";

export const resetProposition = async () => {
  try {
    await AsyncStorage.removeItem("propositions");
  } catch (error) {
    console.log(error);
  }
};
