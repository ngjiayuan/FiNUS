import React, { useState } from "react";
import { TouchableOpacity, View, FlatList, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { SafeArea } from "../../components/SafeArea";
import { HeaderView, HeaderText } from "../../components/HeaderComponent";
import {
  LinkCard,
  FilterContainer,
  CardListContainer,
  Filter,
} from "./links.component";
import { links } from "./url";

export function LinksScreen() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [items, setItems] = useState([
    { label: "All", value: "all" },
    { label: "NUS Merch", value: "merch" },
    { label: "Investments", value: "invest" },
    { label: "Student Promos", value: "promo" },
  ]);

  const openLink = async (website) => {
    await WebBrowser.openBrowserAsync(website);
  };

  const FilteredData = (unfilteredData) => {
    return !filter || filter === "all"
      ? unfilteredData
      : unfilteredData.filter((item) => item.category === filter);
  };

  return (
    <SafeArea>
      <HeaderView>
        <HeaderText>Links</HeaderText>
      </HeaderView>
      <View flex={1}>
        <FilterContainer>
          <Filter
            open={open}
            value={filter}
            items={items}
            setOpen={setOpen}
            setValue={setFilter}
            setItems={setItems}
            containerStyle={styles.containerStyle}
            textStyle={styles.textStyle}
            placeholder="Filter..."
            placeholderStyle={styles.placeholderStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
          />
        </FilterContainer>
        <CardListContainer>
          <FlatList
            data={FilteredData(links)}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => openLink(item.website)}>
                  <LinkCard link={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </CardListContainer>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: 170,
  },
  textStyle: {
    fontFamily: "Poppins_400Regular",
  },
  placeholderStyle: {
    fontStyle: "italic",
    color: "grey",
  },
  dropDownContainerStyle: {
    borderRadius: 3,
    borderWidth: 0.5,
  },
  contentContainerStyle: {
    padding: 16,
  },
});
