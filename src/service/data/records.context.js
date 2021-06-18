import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const RecordsContext = createContext();

export function RecordsContextProvider({ children }) {
  const { user } = useContext(AuthenticationContext);
  const [records, setRecords] = useState([]);

  const add = (date, amount, category, isExpense, timeStamp) => {
    setRecords([...records, { date, amount, category, isExpense, timeStamp }]);
  };

  const clear = () => {
    setRecords([]);
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
    newTimeStamp
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

  useEffect(() => {
    if (user && user.uid) {
      getRecords(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && records.length) {
      storeRecords(user.uid);
    }
  }, [records, user]);

  return (
    <RecordsContext.Provider
      value={{
        records,
        addRecord: add,
        clear,
        removeRecord: remove,
        editRecord: edit,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}
