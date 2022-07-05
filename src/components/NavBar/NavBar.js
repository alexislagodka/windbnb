import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import { useSearchParams } from "react-router-dom";

export default function NavBar() {
  const [yOffset, setYOffset] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const [openSearch, setOpenSearch] = useState(false);

  let [searchParams] = useSearchParams();

  let cityParam = searchParams.get("city");
  let countryParam = searchParams.get("country");
  let adultsParam = searchParams.get("adults");
  let childrenParam = searchParams.get("children");

  let nbGuests = 0;
  let location = "";

  if (cityParam && countryParam) location = `${cityParam}, ${countryParam}`;
  if (adultsParam) nbGuests += parseInt(adultsParam);
  if (childrenParam) nbGuests += parseInt(childrenParam);

  useEffect(() => {
    openSearch
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [openSearch]);

  const handleScroll = () => {
    const currentYOffset = window.pageYOffset;
    const visible = yOffset > currentYOffset;

    setYOffset(currentYOffset);
    setVisible(visible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div
      className={`z-10 sticky top-0 bg-white flex justify-center shadow-sm transition delay-200 ease-in-out duration-500 ${
        !visible && "-translate-y-full"
      }`}
    >
      <div className="w-4/5">
        <div className="h-40 md:h-24 grid grid-cols-1 md:grid-cols-2">
          <div className="h-full flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="p-4" />
            </Link>
          </div>
          <div className="w-full flex justify-center md:justify-end items-center">
            <div
              className="w-96 h-14 grid grid-cols-[1fr_1fr_60px]  rounded-2xl shadow-[0_1px_6px_rgba(0,0,0,0.1)] hover:cursor-pointer hover:shadow-[0_1px_6px_salmon]"
              onClick={() => setOpenSearch(!openSearch)}
            >
              <div
                className={`border-r flex justify-center items-center p-2 ${
                  !location && "text-gray-400"
                }`}
              >
                {location ? location : "Add location"}
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
      <SearchForm open={openSearch} close={() => setOpenSearch(false)} />
    </div>
  );
}
