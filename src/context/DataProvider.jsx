import React, { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userArchived, setUserArchived] = useState([]);

  const [availableMTOP, setAvailableMTOP] = useState([]);
  const [availableMTOPLoading, setAvailableMTOPLoading] = useState(true);

  const [franchises, setFranchises] = useState([]);
  const [franchisesLoading, setFranchisesLoading] = useState(true);

  const [archivedFranchises, setArchivedFranchises] = useState([]);
  const [archivedFranchisesLoading, setArchivedFranchisesLoading] =
    useState(true);

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
        availableMTOPLoading,
        setAvailableMTOPLoading,
        franchisesLoading,
        setFranchisesLoading,
        archivedFranchisesLoading,
        setArchivedFranchisesLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
