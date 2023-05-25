import { View, Text } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

export default function index() {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: <View><Text>Test</Text></View>,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
}
