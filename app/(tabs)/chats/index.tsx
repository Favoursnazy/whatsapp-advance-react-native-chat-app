import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ChatRow from "@/components/ChatRow";
import chats from "@/assets/data/chats.json";
import { defaultStyle } from "@/constants/Styles";

const Page = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, backgroundColor: "#fff" }}
    >
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyle.seperator, { marginLeft: 90 }]} />
        )}
        renderItem={({ item, index }) => <ChatRow {...item} />}
      />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
