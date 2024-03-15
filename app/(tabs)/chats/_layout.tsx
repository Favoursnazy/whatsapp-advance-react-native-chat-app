import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          // headerSearchBarOptions: {
          //   placeholder: "Search"
          // },5555
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <Link href="/modals/newChat" asChild>
                <TouchableOpacity>
                  <Ionicons
                    color={Colors.primary}
                    size={30}
                    name="add-circle"
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                color={Colors.primary}
                size={30}
              />
            </TouchableOpacity>
          ),
          // headerBlurEffect: "regular",
          // headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingBottom: 4,
                alignItems: "center",
                width: 220,
              }}
            >
              <Image
                source={{
                  uri: "https://i.pravatar.cc/150?u=burtvelazquez@genmy.com",
                }}
                style={{ height: 40, width: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Favoursnazy
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="videocam-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="call-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  );
};

export default _layout;
