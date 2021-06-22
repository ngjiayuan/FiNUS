/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mock } from "./records.mock";
import { InitialBudgetList } from "./records.budget";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const RecordsContext = createContext();

export function RecordsContextProvider({ children }) {
  const { user } = useContext(AuthenticationContext);
  const [records, setRecords] = useState(mock);
  const [budget, setBudget] = useState(InitialBudgetList);

  const add = (date, amount, category, isExpense, timeStamp, yearMonth) => {
    setRecords([
      ...records,
      { date, amount, category, isExpense, timeStamp, yearMonth },
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

  const editBudget = (amount, category, ifSelected) => {
    const newBudget = budget.map((ele) =>
      ele.category.catName === category.catName
        ? { amount, category, ifSelected }
        : ele
    );
    setBudget(newBudget);
  };

  useEffect(() => {
    if (user && user.uid) {
      getRecords(user.uid);
      getBudget(user.uid);
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
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}
