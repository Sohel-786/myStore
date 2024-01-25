import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

function Filter({ data, sort }) {
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();

  const [sortingConditions, setSortingConditions] = useState({
    brand: [],
    price: {
      from: 0,
      to: 0,
    },
    discount: 0,
  });

  useEffect(() => {
    let temp = {};
    let temp2 = {};
    let temp3 = {};
    for (let i = 0; i < data.length; i++) {
      let key = data[i].brand;
      let key2 = handleSalePrice(data[i].price, data[i].pricedrop);
      let key3 = data[i].pricedrop;

      if (temp[key]) {
        temp[key] = temp[key] + 1;
      } else {
        temp[key] = 1;
      }

      if (temp2[key2]) {
        temp2[key2] = temp2[key2] + 1;
      } else {
        temp2[key2] = 1;
      }

      if (temp3[key3]) {
        temp3[key3] = temp3[key3] + 1;
      } else {
        if (key3) {
          temp3[key3] = 1;
        }
      }
    }

    temp = Object.keys(temp).map((key) => [key, temp[key]]);
    temp2 = Object.keys(temp2);
    temp3 = Object.keys(temp3);
    let arr = [];
    for (let i = 10; i <= 90; i += 10) {
      if (i < Math.max(...temp3)) {
        arr.push(i);
      } else {
        break;
      }
    }

    setBrand(temp);
    setPrice({
      min: Math.min(...temp2),
      max: Math.max(...temp2),
    });
    setDiscount(arr);
    setSortingConditions(function (s) {
      return {
        ...s,
        price: {
          from: Math.min(...temp2),
          to: Math.max(...temp2),
        },
        discount: arr[0],
      };
    });
  }, [data]);

  function handleSalePrice(price, off) {
    let temp = (off / 100) * price;
    return Math.floor(price - temp);
  }

  useEffect(() => {
    let temp = [];
    if (sortingConditions.brand.length > 0) {
      temp = data.filter((el) => {
        if (sortingConditions.brand.includes(el.brand)) {
          if (
            handleSalePrice(el.price, el.pricedrop) >=
              sortingConditions.price.from &&
            handleSalePrice(el.price, el.pricedrop) <=
              sortingConditions.price.to
          ) {
            if (
              el.pricedrop >= sortingConditions.discount ||
              el.pricedrop === 0 ||
              (el.pricedrop > 0 && el.pricedrop < 10)
            ) {
              return el;
            }
          }
        }
      });
    } else {
      temp = data.filter((el) => {
        if (
          handleSalePrice(el.price, el.pricedrop) >=
            sortingConditions.price.from &&
          handleSalePrice(el.price, el.pricedrop) <= sortingConditions.price.to
        ) {
          if (
            el.pricedrop >= sortingConditions.discount ||
            el.pricedrop === 0 ||
            (el.pricedrop > 0 && el.pricedrop < 10)
          ) {
            return el;
          }
        }
      });
    }

    sort(temp);
  }, [sortingConditions]);

  function handleBrand(e) {
    const { name } = e.target;
    scrollTo({
      top: 70,
      behavior: "instant",
    });
    if (sortingConditions.brand.includes(name)) {
      let temp = sortingConditions.brand.filter((el) => {
        if (name !== el) {
          return el;
        }
      });
      setSortingConditions(function (s) {
        return {
          ...sortingConditions,
          brand: [...temp],
        };
      });
    } else {
      setSortingConditions(function (s) {
        return {
          ...sortingConditions,
          brand: [...sortingConditions.brand, name],
        };
      });
    }
  }

  function handleChnage(e) {
    const { value, name } = e.target;
    scrollTo({
      top: 70,
      behavior: "instant",
    });
    setSortingConditions(function (s) {
      return {
        ...sortingConditions,
        price: {
          ...s.price,
          [name]: value,
        },
      };
    });
  }

  function handleDiscount(el) {
    scrollTo({
      top: 70,
      behavior: "smooth",
    });
    setSortingConditions(function (s) {
      return {
        ...s,
        discount: el,
      };
    });
  }

  function handleClearFilter() {
    scrollTo({
      top: 100,
      behavior: "instant",
    });
    setSortingConditions({
      brand: [],
      price: {
        from: price.min,
        to: price.max,
      },
      discount: discount[0],
    });
  }
  return (
    <div className="flex flex-col w-full pl-6 relative">
      {sortingConditions && price && discount && (
        <div
          onClick={handleClearFilter}
          className={`absolute right-0 top-[-5px] hover:bg-gray-500 hover:text-white rounded-md px-2 font-Roboto bg-gray-200 ${
            sortingConditions.brand.length !== 0 ||
            sortingConditions.price.from !== price.min ||
            sortingConditions.price.to !== price.max ||
            sortingConditions.discount !== discount[0]
              ? "flex"
              : "hidden"
          } cursor-pointer justify-center items-center`}
        >
          <IoIosClose size={"25px"} />
          Clear
        </div>
      )}
      <h1 className="font-bold text-[12px]">BRAND</h1>
      <hr className="mt-2" />
      <div className="my-5 flex flex-col max-h-[300px] overflow-y-scroll">
        {brand &&
          brand.map(([el, value]) => {
            return (
              <div key={nanoid(4)} className="w-full flex gap-2">
                <input
                  readOnly
                  type="checkbox"
                  name={el}
                  id={el}
                  value={el}
                  className="capitalize"
                  onClick={handleBrand}
                  checked={sortingConditions.brand.includes(el) ? true : false}
                />
                <label htmlFor={el} className="capitalize text-sm">
                  {el} ({value})
                </label>
              </div>
            );
          })}
      </div>
      <hr className="mt-2 mb-3" />
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-[12px]">PRICE</h1>
        <div className="my-5 flex w-full gap-2 pr-2">
          {price && (
            <>
              <input
                type="Number"
                className="w-[50%] outline-none py-1 px-1 text-sm border-[1.5px] border-gray-400 rounded-sm bg-blue-50 font-bold text-gray-600 font-Roboto"
                value={sortingConditions.price.from}
                name="from"
                id="min"
                onChange={handleChnage}
              />
              <input
                type="Number"
                className="w-[50%] outline-none py-1 px-1 text-sm border-[1.5px] border-gray-400 rounded-sm bg-blue-50 font-bold text-gray-600 font-Roboto"
                value={sortingConditions.price.to}
                name="to"
                id="max"
                onChange={handleChnage}
              />
            </>
          )}
        </div>
      </div>

      <hr className="mt-2 mb-3" />

      <div className="flex flex-col w-full">
        <h1 className="font-bold text-[12px]">DISCOUNT RANGE</h1>
        <div className="my-5 flex flex-col w-full pr-2 text-sm gap-[1.5px] tracking-wide">
          <p className="font-mono text-xs font-bold mb-2 text-gray-500">
            Product with 0% discount and below 10% is also included.
          </p>
          {discount &&
            discount.map((el, i) => {
              return (
                <div key={nanoid(5)} className="flex w-full gap-1">
                  <input
                    type="radio"
                    value={el}
                    checked={sortingConditions.discount === el ? true : false}
                    name={el}
                    onChange={() => {
                      handleDiscount(el);
                    }}
                    id={el}
                  />
                  <label htmlFor={el}>{el}% and above</label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Filter;
