import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { nanoid } from "nanoid";

function AddressAddUpdate({ Addressdata }) {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");
  const [data, setData] = useState(
    Addressdata
      ? {
          ...Addressdata,
        }
      : {
          address: "",
          country: "",
          state: "",
          city: "",
          postal: "",
        }
  );

  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    handleCountries();
  }, []);

  async function handleCountries() {
    let { data } = await axiosInstance.get("/country-data");

    setCountryData(data.data);
  }

  function handleChange(e){
    const { value, name } = e.target;

    setData({
      ...data,
      [name] : value
    })
  }

  function handleSubmit() {}

  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full px-8 flex flex-col">
        <label
          htmlFor="address"
          className="font-Nova text-[20px] font-bold text-gray-600 mt-4 mb-2 capitalize"
        >
          Enter Your Address
        </label>
        <textarea
          name="address"
          id="address"
          rows="3"
          className="border-2 border-gray-500 resize-none rounded-md p-2"
        ></textarea>
        <p className="font-Roboto text-[13px] mt-1">
          Apartment, suite, unit, building, floor, street address, etc.
        </p>

        <hr className="my-3" />

        <label
          htmlFor="country"
          className="font-Nova text-[20px] font-bold text-gray-600 mb-2 capitalize inline-block"
        >
          Country
        </label>
        <select
          onChange={handleChange}
          name="country"
          id="country"
          className="border-black border-2 rounded-sm px-2 py-2"
          value={data.country}
        >
          {countryData && (
            <>
              {
                Object.keys(countryData).map((el) => {
                return (
                  <option key={nanoid(4)} value={el}>
                    {el}
                  </option>
                );
              })
              }
            </>
          )}
        </select>

        <hr className="my-3" />

        <label
          htmlFor="state"
          className="font-Nova text-[20px] font-bold text-gray-600 mb-2 capitalize inline-block"
        >
          State / Province / Region
        </label>
        <select
          name="state"
          id="state"
          className="border-black border-2 rounded-sm px-2 py-2"
        >
          {data.country !== "" && (
            <>
              {countryData[data.country].map((el) => {
                return (
                  <option key={nanoid(4)} value={el}>
                    {el}
                  </option>
                );
              })}
            </>
          )}
        </select>

        <hr className="my-3" />

        <div className="w-full flex justify-center items-center gap-3">
          <div className="w-[50%]">
            <label
              htmlFor="city"
              className="font-Nova text-[20px] font-bold text-gray-600 mb-2 capitalize block"
            >
              City
            </label>
            <select
              name="city"
              id="city"
              className="border-black border-2 rounded-sm px-2 py-2 w-full"
            >
              <option value={"ahmedabad"}>Ahmedabad</option>
            </select>
          </div>
          <div className="w-[50%]">
            <label
              htmlFor="postal"
              className="font-Nova text-[20px] font-bold text-gray-600 mb-2 capitalize inline-block"
            >
              Zip / Postal Code
            </label>
            <input
              name="postal"
              id="postal"
              className="border-2 border-gray-500 resize-none rounded-md p-2"
            />
          </div>
        </div>

        <hr className="my-5" />

        <button
          aria-label="Save Address"
          onClick={() => {}}
          className="border-2 flex bg-black text-white justify-center items-center gap-2 relative shadow-logBtn border-black  rounded-[5px] cursor-pointer px-3 py-2 font-bold text-xs before:content-[''] before:right-full before:absolute before:top-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-zinc-400 before:via-zinc-600 before:to-zinc-800 hover:border-white before:z-[4] before:transition-all before:ease-in-out hover:before:right-0 lg:py-[5px] lg:px-3 lg:text-base overflow-hidden"
        >
          <span className="z-[5]">SAVE</span>
        </button>
      </form>
    </div>
  );
}

export default AddressAddUpdate;
