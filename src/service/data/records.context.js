import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mock } from "./records.mock";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const RecordsContext = createContext();

export function RecordsContextProvider({ children }) {
  const { user } = useContext(AuthenticationContext);
  const [records, setRecords] = useState(mock);

  const add = (date, amount, category, isExpense, timeStamp, yearMonth) => {
    setRecords([
      ...records,
      { date, amount, category, isExpense, timeStamp, yearMonth },
    ]);
  };

  const clear = () => {
    setRecords([]);
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
    if (user && user.uid) {
      storeRecords(user.uid);
    }
  }, [records, user]);

  return (
    <RecordsContext.Provider
      value={{
        records,
        addRecord: add,
        clear,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}