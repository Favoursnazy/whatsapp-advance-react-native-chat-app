import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { defaultStyle } from "@/constants/Styles";
import BoxedIcon from "@/components/BoxedIcon";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const devices = [
    {
      name: "Broadcast List",
      icon: "megaphone",
      backgroundColor: Colors.green,
    },
    {
      name: "Starred messages",
      icon: "star",
      backgroundColor: Colors.yellow,
    },
    {
      name: "Linked Devices",
      icon: "laptop-outline",
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: "Account",
      icon: "key",
      backgroundColor: Colors.primary,
    },
    {
      name: "Privacy",
      icon: "lock-closed",
      backgroundColor: "#33A5D1",
    },
    {
      name: "Chats",
      icon: "logo-whatsapp",
      backgroundColor: Colors.green,
    },
    {
      name: "Notifications",
      icon: "notifications",
      backgroundColor: Colors.red,
    },
    {
      name: "Storage and Data",
      icon: "repeat",
      backgroundColor: Colors.green,
    },
  ];

  const support = [
    {
      name: "Help",
      icon: "information",
      backgroundColor: Colors.primary,
    },

    {
      name: "Tell a Friend",
      icon: "heart",
      backgroundColor: Colors.red,
    },
  ];

  const signOut = () => {};

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView>
        <View style={defaultStyle.block}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyle.seperator} />
            )}
            renderItem={({ item }) => (
              <View style={defaultStyle.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>
        <View style={defaultStyle.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyle.seperator} />
            )}
            renderItem={({ item }) => (
              <View style={defaultStyle.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>
        <View style={defaultStyle.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyle.seperator} />
            )}
            renderItem={({ item }) => (
              <View style={defaultStyle.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>
        <TouchableOpacity onPress={signOut}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              textAlign: "center",
              paddingVertical: 14,
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Page;
