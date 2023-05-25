import AsyncStorage from "@react-native-async-storage/async-storage";

export const addProposition = async (proposition) => {
  try {
    const savedPropositions = await AsyncStorage.getItem("propositions");
    const propositions = savedPropositions ? JSON.parse(savedPropositions) : [];
    const newPropositions = [...propositions, proposition];
    await AsyncStorage.setItem("propositions", JSON.stringify(newPropositions));
  } catch (error) {
    console.log(error);
  }
};
