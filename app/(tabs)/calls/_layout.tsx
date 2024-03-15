import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Calls",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="call-outline" color={Colors.primary} size={30} />
            </TouchableOpacity>
          ),
          // headerBlurEffect: "regular",
          // headerTransparent: true,
        }}
      />
    </Stack>
  );
};

export default _layout;
