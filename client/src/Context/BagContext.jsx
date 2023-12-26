import { createContext, useState } from "react";

const BagContext = createContext({ isOpenBag: false, handleBag: () => {} });

const ContextProvider = ({ children }) => {
  const [isOpenBag, setIsOpenBag] = useState(false);

  function handleBag() {
    setIsOpenBag(!isOpenBag);
  }

  return (
    <BagContext.Provider value={{ isOpenBag, handleBag }}>
      {children}
    </BagContext.Provider>
  );
}

export { BagContext , ContextProvider };