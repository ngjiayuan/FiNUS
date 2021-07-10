/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mock } from "./records.mock";
import { InitialBudgetList } from "./records.budget";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const RecordsContext = createContext();

export function RecordsContextProvider({ children }) {
  const { user } = useContext(AuthenticationContext);
  const [records, setRecords] = useState([]);
  const [budget, setBudget] = useState(InitialBudgetList);
  const [reminder, setReminder] = useState(null);

  const add = (
    date,
    amount,
    category,
    isExpense,
    timeStamp,
    yearMonth,
    comment
  ) => {
    setRecords([
      ...records,
      { date, amount, category, isExpense, timeStamp, yearMonth, comment },
    ]);
  };

  const addBudget = (amount, category, ifSelected) => {
    setBudget([...budget, { amount, category, ifSelected }]);
  };

  const clear = () => {
    setRecords([]);
  };

  const clearBudget = () => {
    setBudget(InitialBudgetList);
  };

  const remove = (timeStamp) => {
    const newRecords = records.filter((item) => item.timeStamp !== timeStamp);
    setRecords(newRecords);
  };

  const edit = (
    oldTimeStamp,
    newDate,
    newAmount,
    newCategory,
    isExpense,
    newTimeStamp,
    yearMonth,
    newComment
  ) => {
    const newRecords = records.filter(
      (item) => item.timeStamp !== oldTimeStamp
    );
    newRecords.push({
      date: newDate,
      amount: newAmount,
      category: newCategory,
      isExpense: isExpense,
      timeStamp: newTimeStamp,
      yearMonth: yearMonth,
      comment: newComment,
    });
    setRecords(newRecords);
  };

  const storeRecords = async (uid) => {
    try {
      await AsyncStorage.setItem(`@records-${uid}`, JSON.stringify(records));
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const storeBudget = async (uid) => {
    try {
      await AsyncStorage.setItem(`@budget-${uid}`, JSON.stringify(budget));
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const storeReminder = async (uid) => {
    try {
      await AsyncStorage.setItem(`@reminder-${uid}`, JSON.stringify(reminder));
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const getRecords = async (uid) => {
    try {
      const values = await AsyncStorage.getItem(`@records-${uid}`);
      if (values && JSON.parse(values).length) {
        setRecords(JSON.parse(values));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const getBudget = async (uid) => {
    try {
      const values = await AsyncStorage.getItem(`@budget-${uid}`);
      if (values && JSON.parse(values).length) {
        setBudget(JSON.parse(values));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const getReminder = async (uid) => {
    try {
      const values = await AsyncStorage.getItem(`@reminder-${uid}`);
      if (values) {
        setReminder(JSON.parse(values));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const editBudget = (amount, category, ifSelected) => {
    const newBudget = budget.map((ele) =>
      ele.category.catName === category.catName
        ? { amount, category, ifSelected }
        : ele
    );
    setBudget(newBudget);
  };

  const editReminder = (newDate) => {
    setReminder(newDate);
  };

  useEffect(() => {
    if (user && user.uid) {
      getRecords(user.uid);
      getBudget(user.uid);
      getReminder(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      storeRecords(user.uid);
    }
  }, [records, user]);

  useEffect(() => {
    if (user && user.uid) {
      storeBudget(user.uid);
    }
  }, [budget, user]);

  useEffect(() => {
    if (user && user.uid) {
      storeReminder(user.uid);
    }
  }, [reminder, user]);

  return (
    <RecordsContext.Provider
      value={{
        records,
        addRecord: add,
        clear,
        budget,
        addBudget: addBudget,
        clearBudget,
        editBudget,
        removeRecord: remove,
        editRecord: edit,
        reminder,
        editReminder,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}
