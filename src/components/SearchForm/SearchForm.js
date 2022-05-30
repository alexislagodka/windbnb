import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function SearchForm({ close }) {
  // show form option "location" or "guests"
  const [showOptions, setShowOptions] = useState(null);
  const [dataForm, setDataForm] = useState({
    city: "",
    country: "",
    nbGuests: 0,
    adults: 0,
    children: 0,
  });

  // Get actual query parameters
  let [searchParams] = useSearchParams();

  let cityParam = searchParams.get("city");
  let countryParam = searchParams.get("country");
  let adultsParam = searchParams.get("adults");
  let childrenParam = searchParams.get("children");

  let nbGuests = 0;

  if (adultsParam) nbGuests += parseInt(adultsParam);
  if (childrenParam) nbGuests += parseInt(childrenParam);

  useEffect(() => {
    setDataForm({
      city: cityParam,
      country: countryParam,
      nbGuests: nbGuests,
      adults: adultsParam ? adultsParam : 0 ,
      children: childrenParam ? childrenParam : 0,
    })
  }, [cityParam, countryParam, nbGuests, adultsParam, childrenParam])

  

  // Get locations options
  const stays = require("../../assets/datas/stays.json");
  let locations = [];
  stays.forEach((stay) => {
    if (!locations.some((location) => location.city === stay.city)) {
      locations.push({
        city: stay.city,
        country: stay.country,
      });
    }
  });

  // Initialize the query search
  const navigate = useNavigate();
  const search = () => {
    let params = [];
    dataForm.city && params.push(["city", dataForm.city]);
    dataForm.country && params.push(["country", dataForm.country]);
    dataForm.adults && params.push(["adults", dataForm.adults]);
    dataForm.children && params.push(["children", dataForm.children]);

    navigate({
      pathname: "/stays",
      search: `?${createSearchParams(params)}`,
    });
    close();
  };

  // Manage number of guests
  const addAdults = () => {
    setDataForm({
      ...dataForm,
      nbGuests: dataForm.nbGuests + 1,
      adults: dataForm.adults + 1,
    });
  };

  const addChildren = () => {
    setDataForm({
      ...dataForm,
      nbGuests: dataForm.nbGuests + 1,
      children: dataForm.children + 1,
    });
  };

  const subAdults = () => {
    dataForm.adults !== 0 &&
      setDataForm({
        ...dataForm,
        nbGuests: dataForm.nbGuests - 1,
        adults: dataForm.adults - 1,
      });
  };

  const subChildren = () => {
    dataForm.children !== 0 &&
      setDataForm({
        ...dataForm,
        nbGuests: dataForm.nbGuests - 1,
        children: dataForm.children - 1,
      });
  };

  return (
    <div className="h-full absolute top-0 overflow-hidden">
      <div className="h-auto bg-white w-screen grid grid-rows-[30px_auto_1fr_80px] md:grid-rows-[30px_auto_1fr]">
        <div className="p-2 w-full flex justify-between font-bold md:invisible">
          <div>Edit your search</div>
          <button onClick={close}>X</button>
        </div>
        <div className="w-full flex justify-center items-center py-2">
          <div className="grid md:grid-cols-3  w-4/5 rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.1)]">
            <div
              className={`h-14 grid border-b md:border-b-0 md:border-r p-1 hover:cursor-pointer ${
                showOptions !== "location" && "hover:text-salmon"
              }`}
              onClick={() => setShowOptions("location")}
            >
              <div className="pt-2 pl-4 text-xs font-bold">LOCATION</div>
              <div className={`pl-4 ${!dataForm.country && "text-gray-400"}`}>
                {!dataForm.country
                  ? "Add location"
                  : `${dataForm.city}, ${dataForm.country}`}
              </div>
            </div>
            <div
              className={`h-14 grid p-1 md:border-r hover:cursor-pointer ${
                showOptions !== "guests" && "hover:text-salmon"
              }`}
              onClick={() => setShowOptions("guests")}
            >
              <div className="pt-2 pl-4 text-xs font-bold">GUESTS</div>
              <div className={`pl-4 ${!dataForm.nbGuests && "text-gray-400"}`}>
                {!dataForm.nbGuests
                  ? "Add guests"
                  : `${dataForm.nbGuests} guest(s)`}
              </div>
            </div>
            <div className="flex justify-center items-center hidden md:flex">
              <button
                className="flex justify-center items-center h-12 w-28 bg-salmon rounded-xl font-bold text-white hover:opacity-75"
                onClick={search}
              >
                <FiSearch /> Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-4/5 md:grid md:grid-cols-3">
            <div>
              {showOptions === "location" && (
                <div className="grid py-2">
                  {locations.map((location, index) => {
                    return (
                      <button
                        key={index}
                        className="w-full text-gray-600 h-12 flex items-center hover:bg-gray-100"
                        onClick={() =>
                          setDataForm({
                            ...dataForm,
                            city: location.city,
                            country: location.country,
                          })
                        }
                      >
                        <MdLocationOn className="m-2" />
                        {location.city}, {location.country}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              {showOptions === "guests" && (
                <div className="grid text-sm ">
                  <div className="py-2">
                    <div className="font-bold">Adults</div>
                    <div className="text-gray-400">Ages 13 or above</div>
                    <div className="py-2">
                      <div className="flex">
                        <button
                          className="border border-black rounded w-6 h-6 hover:bg-gray-200"
                          onClick={subAdults}
                        >
                          -
                        </button>
                        <div className="text-center w-10">
                          {dataForm.adults}
                        </div>
                        <button
                          className="border border-black rounded w-6 h-6 hover:bg-gray-200"
                          onClick={addAdults}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="py-4">
                    <div className="font-bold">Children</div>
                    <div className="text-gray-400">Ages 2-12</div>
                    <div className="py-2">
                      <div className="flex">
                        <button
                          className="border border-black rounded w-6 h-6 hover:bg-gray-200"
                          onClick={subChildren}
                        >
                          -
                        </button>
                        <div className="text-center w-10">
                          {dataForm.children}
                        </div>
                        <button
                          className="border border-black rounded w-6 h-6 hover:bg-gray-200"
                          onClick={addChildren}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center md:hidden">
          <button
            className="flex justify-center items-center h-12 w-28 bg-salmon rounded-xl font-bold text-white hover:opacity-75"
            onClick={search}
          >
            <FiSearch /> Search
          </button>
        </div>
      </div>
      <div className="h-full bg-gray-500 opacity-50" onClick={close}></div>
    </div>
  );
}
