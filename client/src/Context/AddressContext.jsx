import { createContext, useState } from "react";

const AddressContext = createContext({ Address: false, toggleAddressDrawer: () => {}});

const AddressContextProvider = ({ children }) => {
  const [Address, setAddress] = useState(false);

  function toggleAddressDrawer() {
    setAddress(!Address);
  }

  return (
    <AddressContext.Provider value={{ Address, toggleAddressDrawer }}>
      {children}
    </AddressContext.Provider>
  );
}

export { AddressContext , AddressContextProvider };