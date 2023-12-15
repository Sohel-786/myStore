function Product({ data }) {
  const {
    name,
    description,
    brand,
    category,
    price,
    deliveryInfo,
    availableSizes,
    sale,
    pricedrop,
    thumbnail,
  } = data;

  if(sale === 'YES'){
    price = handleSalePrice(price, pricedrop);
  }

  function handleSalePrice(price, off){
    let temp = (off/100) * price;
    return price - temp ;
  }
  return <></>;
}

export default Product;
