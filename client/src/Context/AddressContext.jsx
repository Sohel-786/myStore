import { createContext, useState } from "react";

const AddressContext = createContext({
  Address: false,
  toggleAddressDrawer: () => {},
  handleAddressChange: () => {},
});

const AddressContextProvider = ({ children }) => {
  const [Address, setAddress] = useState(false);
  const [addressData, setAddressData] = useState(null);

  function toggleAddressDrawer() {
    setAddress(!Address);
  }

  function handleAddressChange(data) {
    setAddressData(data);
    toggleAddressDrawer();
  }

  return (
    <AddressContext.Provider
      value={{ Address, toggleAddressDrawer, addressData, handleAddressChange }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContext, AddressContextProvider };
