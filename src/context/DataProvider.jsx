import React, { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userArchived, setUserArchived] = useState([]);
  const [availableMTOP, setAvailableMTOP] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [archivedFranchises, setArchivedFranchises] = useState([]);

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        userArchived,
        setUserArchived,
        franchises,
        setFranchises,
        archivedFranchises,
        setArchivedFranchises,
        availableMTOP,
        setAvailableMTOP,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
