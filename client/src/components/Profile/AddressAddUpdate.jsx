import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { nanoid } from "nanoid";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/slices/authSlice";

function AddressAddUpdate({ Addressdata, toggle }) {
  const dispatch = useDispatch();
  const [data, setData] = useState(
    Addressdata
      ? {
          ...Addressdata,
        }
      : {
          address: "",
          country: "India",
          state: "Gujarat",
          city: "",
          postal: "",
        }
  );

  const [countryData, setCountryData] = useState(null);
  const [cities, setCities] = useState(null);

  useEffect(() => {
    handleCountries();
  }, []);

  useEffect(() => {
    handleCities(data.country, data.state);
  }, [data.state]);

  async function handleCountries() {
    let { data } = await axiosInstance.get("/country-data");

    setCountryData(data.data);
  }

  async function handleCities(country, state) {
    if (data.state !== "not available") {
      try {
        let { data: res } = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            country,
            state,
          }
        );
        setCities(res.data);
      } catch (e) {
        console.log("Error");
      }
    }
  }

  function handleChange(e) {
    const { value, name } = e.target;

    setData(function (s) {
      return {
        ...s,
        [name]: value,
      };
    });

    if (name === "country") {
      if (countryData[value].length === 0) {
        setData(function (s) {
          return {
            ...s,
            state: "not available",
            city: "not available",
          };
        });

        setCities([]);
      } else {
        setData(function (s) {
          return {
            ...s,
            state: countryData[value][0],
          };
        });
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if ((!data.address, !data.country, !data.state, !data.city, !data.postal)) {
      toast.error("Please Fill all the field");
      return;
    }

    try {
      const res = axiosInstance.post("/user/add-address", data);
      toast.promise(res, {
        pending: "Wait, Adding your address",
        success: "Address Added Successfully",
        error: "Something Went Wrong",
      });

      await res;
      if (res?.data?.success) {
        setData({
          address: "",
          country: "India",
          state: "Gujarat",
          city: "",
          postal: "",
        });

        toggle();
        dispatch(getUserDetails());
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }

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
          onChange={handleChange}
          name="address"
          id="address"
          rows="3"
          value={data.address}
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
          {!countryData ? (
            <option value={data.country}>{data.country}</option>
          ) : (
            <>
              {Object.keys(countryData).map((el) => {
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

        <label
          htmlFor="state"
          className="font-Nova text-[20px] font-bold text-gray-600 mb-2 capitalize inline-block"
        >
          State / Province / Region
        </label>
        <select
          onChange={handleChange}
          name="state"
          id="state"
          className="border-black border-2 rounded-sm px-2 py-2"
          value={data.state}
        >
          {!countryData ? (
            <option value={data.state}>{data.state}</option>
          ) : (
            <>
              {countryData[data.country].length === 0 ? (
                <option value={"Not Available"}>{"Not Available"}</option>
              ) : (
                countryData[data.country].map((el) => {
                  return (
                    <option key={nanoid(4)} value={el}>
                      {el}
                    </option>
                  );
                })
              )}
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
              onChange={handleChange}
              name="city"
              id="city"
              className="border-black border-2 rounded-sm px-2 py-2 w-full"
              value={data.city}
            >
              {cities && (
                <>
                  {cities.length === 0 ? (
                    <option value={"Not Available"}>{"Not Available"}</option>
                  ) : (
                    cities.map((el) => {
                      return (
                        <option
                          key={nanoid(4)}
                          value={el}
                          className="capitalize"
                        >
                          {el}
                        </option>
                      );
                    })
                  )}
                </>
              )}{" "}
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
              onChange={handleChange}
              name="postal"
              id="postal"
              className="border-2 border-gray-500 resize-none rounded-md p-2"
              value={data.postal}
            />
          </div>
        </div>

        <hr className="my-5" />

        <button
          type="submit"
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
