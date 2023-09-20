import { React, useState, createContext } from 'react';
export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [newDataDetailView, setNewDataDetailView] = useState([]);
  const [dataJson, setDataJson] = useState([]);

  return (
    <DataContext.Provider value={{newDataDetailView, setNewDataDetailView, dataJson, setDataJson}}>
      {children}
    </DataContext.Provider>
  );
}
