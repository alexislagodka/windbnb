import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import { useSearchParams } from "react-router-dom";

export default function NavBar() {
  const [openSearch, setOpenSearch] = useState(false);

  let [searchParams] = useSearchParams();

  let cityParam = searchParams.get("city");
  let countryParam = searchParams.get("country");
  let adults = searchParams.get("adults");
  let children = searchParams.get("children");

  let nbGuests = 0;
  let location = "";

  if (cityParam && countryParam ) location = `${cityParam}, ${countryParam}`;
  if(adults) nbGuests += parseInt(adults)
  if(children) nbGuests += parseInt(children)

  useEffect(() => {
    openSearch ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
  }, [openSearch])

  return (
    <div className="static flex justify-center">
      <div className="w-4/5">
        <div className="h-40 md:h-24 grid grid-cols-1 md:grid-cols-2">
          <div className="h-full flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="p-4" />
            </Link>
          </div>
          <div className="w-full flex justify-center md:justify-end items-center">
            <div
              className="w-96 h-14 grid grid-cols-[1fr_1fr_60px]  rounded-2xl shadow-[0_1px_6px_rgba(0,0,0,0.1)] hover:cursor-pointer hover:border border-salmon"
              onClick={() => setOpenSearch(!openSearch)}
            >
              <div
                className={`border-r flex justify-center items-center p-2 ${
                  !location && "text-gray-400"
                }`}
              >
                {location ? location :"Add location"}
              </div>
              <div
                className={`border-r flex justify-center items-center p-2 ${
                  !nbGuests && "text-gray-400"
                }`}
              >
                {nbGuests ? `${nbGuests} Guest(s)` : "Add Guest"}
              </div>
              <div className="flex items-center items-center text-salmon">
                <FiSearch className="w-full flex justify-center items-center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {openSearch && <SearchForm close={() => setOpenSearch(false)} />}
    </div>
  );
}
