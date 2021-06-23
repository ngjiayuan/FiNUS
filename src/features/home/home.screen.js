import React, { useEffect, useState, useContext } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import {
  HeaderView,
  HeaderText,
  AddButtonContainer,
  AddButton,
  MonthlySumContainer,
  MonthlyIncome,
  MonthlyExpense,
  ButtonsContainer,
  LogoutButtonContainer,
  LogoutButton,
  ClearButtonContainer,
  ClearButton,
  ListContainer,
  ItemButton,
  ItemText,
  ItemContainer,
} from "./components/home.components";
import { FormattedDate } from "../../components/FormattedDate";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { RecordsContext } from "../../service/data/records.context";
import { IncomeCat } from "../../utils/IncomeCat";
import { ExpenseCat } from "../../utils/ExpenseCat";

export const HomeScreen = ({ navigation }) => {
  const { onLogout } = useContext(AuthenticationContext);
  const { records, clear, clearBudget } = useContext(RecordsContext);

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  var currentMonth = FormattedDate().slice(3);

  const Item = ({ date, amount, category, isExpense, timeStamp }) => (
    <View style={styles.itemContainer(isExpense)}>
      <ItemButton
        onPress={() => {
          navigation.navigate("EditScreen", {
            date: date,
            amount: amount,
            category: category,
            isExpense: isExpense,
            timeStamp: timeStamp,
          });
        }}
      >
        <ItemContainer>
          <View style={styles.categoryIndicator(isExpense, category)} />
          <ItemText>
            {date} : {category} ${amount}
          </ItemText>
        </ItemContainer>
      </ItemButton>
    </View>
  );

  useEffect(() => {
    const currentSum = (currMonth, isExpense) => {
      const res = records.filter(
        (object) =>
          object.date.slice(3) === currMonth && object.isExpense === isExpense
      );
      return res.length === 0
        ? 0
        : res
            .map((object) => object.amount)
            .reduce((sum, object) => parseInt(sum) + parseInt(object));
    };
    setMonthlyIncome(currentSum(currentMonth, false));
    setMonthlyExpense(currentSum(currentMonth, true));
  }, [records, currentMonth]);

  const renderItem = ({ item }) => (
    <Item
      date={item.date}
      amount={item.amount}
      category={item.category}
      isExpense={item.isExpense}
      timeStamp={item.timeStamp}
    />
  );

  const Header = () => {
    return (
      <HeaderView>
        <HeaderText>FiNUS</HeaderText>
      </HeaderView>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
    });
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AddButtonContainer>
          <AddButton
            size={120}
            title="+"
            onPress={() => {
              navigation.navigate("AddingScreen");
              clearBudget();
            }}
          />
        </AddButtonContainer>

        <ButtonsContainer>
          <ClearButtonContainer>
            <ClearButton
              icon="delete"
              color="white"
              labelStyle={{
                fontFamily: "Poppins_400Regular",
              }}
              onPress={() => clear()}
              uppercase={false}
            >
              clear
            </ClearButton>
          </ClearButtonContainer>
          <LogoutButtonContainer>
            <LogoutButton
              icon="logout"
              color="white"
              labelStyle={{
                fontFamily: "Poppins_400Regular",
              }}
              onPress={() => onLogout()}
              uppercase={false}
            >
              logout
            </LogoutButton>
          </LogoutButtonContainer>
        </ButtonsContainer>

        <MonthlySumContainer>
          <MonthlyIncome>monthly income: ${monthlyIncome}</MonthlyIncome>
          <MonthlyExpense>monthly expenses: ${monthlyExpense}</MonthlyExpense>
        </MonthlySumContainer>

        <ListContainer>
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item) => item.timeStamp}
          />
        </ListContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: (isExp) => ({
    padding: 2,
    alignItems: isExp ? "flex-end" : "flex-start",
  }),
  categoryIndicator: (isExp, cat) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: isExp
      ? ExpenseCat.filter((item) => item.catName === cat)[0].color
      : IncomeCat.filter((item) => item.catName === cat)[0].color,
    marginRight: 4,
  }),
});
