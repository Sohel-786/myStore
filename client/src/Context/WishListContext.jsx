import { createContext, useState } from "react";

const WishlistContext = createContext({ IsOpenWishlist: false, handleWishList: () => {} });

const WishlistContextProvider = ({ children }) => {
  const [IsOpenWishlist, setIsOpenWishlist] = useState(false);

  function handleWishList() {
    setIsOpenWishlist(!IsOpenWishlist);
  }

  return (
    <WishlistContext.Provider value={{ IsOpenWishlist, handleWishList }}>
      {children}
    </WishlistContext.Provider>
  );
}

export { WishlistContext , WishlistContextProvider };