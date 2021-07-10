import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import {
  AddButtonContainer,
  AddButton,
  MonthlySumContainer,
  MonthlyIncome,
  MonthlyExpense,
  MonthButton,
  CalendarView,
  Calendar,
  CloseButton,
  ButtonsContainer,
  LogoutButtonContainer,
  LogoutButton,
  ClearButtonContainer,
  ClearButton,
  ListContainer,
  ItemButton,
  ItemText,
  ItemContainer,
  ExpenseTitle,
  IncomeTitle,
} from "./components/home.components";
import { HeaderView, HeaderText } from "../../components/HeaderComponent";
import { FormattedDate } from "../../components/FormattedDate";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { RecordsContext } from "../../service/data/records.context";
import { IncomeCat } from "../../utils/IncomeCat";
import { ExpenseCat } from "../../utils/ExpenseCat";

export const HomeScreen = ({ navigation }) => {
  const { onLogout } = useContext(AuthenticationContext);
  const { records, clear } = useContext(RecordsContext);

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  var currentMonth = FormattedDate().slice(3);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(moment());
  const [data, setData] = useState([]);

  const Item = ({ date, amount, category, isExpense, timeStamp, comment }) => (
    <View style={styles.itemContainer(isExpense)}>
      <ItemButton
        onPress={() => {
          navigation.navigate("EditScreen", {
            date: date,
            amount: amount,
            category: category,
            isExpense: isExpense,
            timeStamp: timeStamp,
            comment: comment,
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
    const currentSum = (isExpense) => {
      const res = data.filter((object) => object.isExpense === isExpense);
      return res.length === 0
        ? 0
        : res
            .map((object) => object.amount)
            .reduce((sum, object) => parseInt(sum, 10) + parseInt(object, 10));
    };
    setMonthlyIncome(currentSum(false));
    setMonthlyExpense(currentSum(true));
  }, [data, currentMonth]);

  const renderItem = ({ item }) => (
    <Item
      date={item.date}
      amount={item.amount}
      category={item.category}
      isExpense={item.isExpense}
      timeStamp={item.timeStamp}
      comment={item.comment}
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
    setData(
      records
        .filter(
          (item) => JSON.stringify(item.yearMonth) === date.format("YYYYMM")
        )
        .sort((a, b) => (a.date === b.date ? 0 : a.date > b.date ? 1 : -1))
        .reverse()
    );
  }, [navigation, date, records]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AddButtonContainer>
          <AddButton
            size={120}
            title="+"
            onPress={() => {
              navigation.navigate("AddingScreen");
            }}
          />
        </AddButtonContainer>

        <ButtonsContainer>
          <ClearButtonContainer>
            <IncomeTitle>Income</IncomeTitle>
          </ClearButtonContainer>
          <LogoutButtonContainer>
            <ExpenseTitle>Expense</ExpenseTitle>
          </LogoutButtonContainer>
        </ButtonsContainer>

        <MonthlySumContainer>
          <MonthlyIncome>${monthlyIncome}</MonthlyIncome>
          <MonthButton
            icon="calendar"
            color="black"
            labelStyle={{ fontFamily: "Poppins_400Regular" }}
            onPress={() => setShow(true)}
            uppercase={false}
          >
            {date.format("MMM YYYY")}
          </MonthButton>
          <Modal
            transparent
            animationType="fade"
            visible={show}
            onRequestClose={() => {
              Alert.alert("Press close to close the calendar");
            }}
          >
            <CalendarView>
              <Calendar>
                <MonthPicker
                  selectedDate={date || new Date()}
                  onMonthChange={setDate}
                />
                <CloseButton
                  icon="close"
                  color="white"
                  labelStyle={{ fontFamily: "Poppins_400Regular" }}
                  onPress={() => setShow(false)}
                  uppercase={false}
                >
                  close
                </CloseButton>
              </Calendar>
            </CalendarView>
          </Modal>
          <MonthlyExpense>${monthlyExpense}</MonthlyExpense>
        </MonthlySumContainer>

        <ListContainer>
          <FlatList
            data={data}
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
