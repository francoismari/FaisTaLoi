import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeProposition = async (propositionName) => {
  try {
    const savedPropositions = await AsyncStorage.getItem("propositions");
    let propositions = savedPropositions ? JSON.parse(savedPropositions) : [];
    propositions = propositions.filter(
      (proposition) => proposition.name !== propositionName
    );
    await AsyncStorage.setItem("propositions", JSON.stringify(propositions));
  } catch (error) {
    // Error removing data
    console.log(error);
  }
};
