import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function Filter({ data }) {
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    let temp = {};
    let temp2 = {};
    for (let i = 0; i < data.length; i++) {
      let key = data[i].brand;
      let key2 = Math.floor(
        data[i].price - (data[i].pricedrop / 100) * data[i].price
      );
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
    }

    temp = Object.keys(temp).map((key) => [key, temp[key]]);
    temp2 = Object.keys(temp2);
    let minMax = [Math.min(...temp2), Math.max(...temp2)];
    setBrand(temp);
    setPrice({
      min: minMax[0],
      max: minMax[1],
    });
  }, [data]);

  return (
    <div className="flex flex-col w-[20%] top-0 pl-6">
      <h1 className="font-bold text-[12px]">BRAND</h1>
      <hr className="mt-2" />
      <div className="my-5 flex flex-col h-[300px] overflow-y-scroll ">
        {brand &&
          brand.map(([el, value]) => {
            return (
              <div key={nanoid(4)} className="w-full flex gap-2">
                <input
                  value={el}
                  type="checkbox"
                  name={el}
                  className="capitalize"
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
        <div className="my-5 flex w-full gap-2">
          {price && (
            <>
              <input
                type="Number"
                className="w-[50%] outline-none py-1 px-1 text-sm border-[1.5px] border-gray-400 rounded-sm bg-blue-50 font-bold text-gray-600 font-Roboto"
                value={price.min}
                name="min"
                id="min"
              />
              <input
                type="Number"
                className="w-[50%] outline-none py-1 px-1 text-sm border-[1.5px] border-gray-400 rounded-sm bg-blue-50 font-bold text-gray-600 font-Roboto"
                value={price.max}
                name="max"
                id="max"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
