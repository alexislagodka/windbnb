import React from "react";
import { useSearchParams } from "react-router-dom";
import StayCard from "../StayCard/StayCard";

export default function Stays() {
  let stays = require("../../assets/datas/stays.json");

  // Get query parameters
  let [searchParams] = useSearchParams();

  let cityParam = searchParams.get("city");
  let countryParam = searchParams.get("country");
  let adultsParam = parseInt(searchParams.get("adults"));
  let childrenParam = parseInt(searchParams.get("children"));

  if (!adultsParam) adultsParam = 0;
  if (!childrenParam) childrenParam = 0;

  let nbGuestsParam = parseInt(adultsParam) + parseInt(childrenParam);

  // Filter the stays with the parameters
  if (cityParam) stays = stays.filter((stay) => stay.city === cityParam);
  if (countryParam)
    stays = stays.filter((stay) => stay.country === countryParam);
  if (adultsParam || childrenParam)
    stays = stays.filter((stay) => stay.maxGuests >= nbGuestsParam);

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="py-4 w-11/12 md:w-4/5 text-right text-gray-500">
        {stays.length} stays
      </div>
      <div className="w-11/12 md:w-4/5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
          stays.map(stay => <StayCard stay={stay} />)
        }
      </div>
    </main>
  );
}
