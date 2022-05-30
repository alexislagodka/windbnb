import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function Stay() {
  let { stayId } = useParams();

  let stays = require("../../assets/datas/stays.json");

  const stay = stays.find((stay) => stay.id === stayId);

  if (!stay)
    return (
      <main className="flex flex-col justify-center items-center">
        <h1>Sorry, this stay doesn't exist.</h1>
        <div className="pt-8">
          <Link to="/stays">
              <BsFillArrowLeftCircleFill size={35} className="text-salmon"/>
          </Link>
        </div>
      </main>
    );

  return (
    <main className="flex justify-center">
      <div className="grid w-4/5 md:w-3/5 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="py-2">{stay.title}</h2>
            {stay.superHost && (
              <span className="ml-2 text-gray-500 font-bold border-2 border-gray-500 px-2 rounded-lg">
                SUPERHOST
              </span>
            )}
          </div>

          <div className="flex items-center text-gray-600">
            <MdLocationOn /> {stay.city}, {stay.country}
          </div>
        </div>
        <img
          src={stay.photo}
          alt={stay.title}
          className="w-full max-h-screen object-cover rounded-xl"
        />
        <table className="table border rounded-xl my-2">
          <tbody className="table-row-group">
            <tr className="table-row odd:bg-slate-100">
              <td className="table-cell">Type</td>
              <td className="table-cell">{stay.type}</td>
            </tr>
            <tr className="table-row odd:bg-slate-100">
              <td className="table-cell">Maximum guests</td>
              <td className="table-cell">{stay.maxGuests}</td>
            </tr>
            <tr className="table-row odd:bg-slate-100">
              <td className="table-cell">Beds</td>
              <td className="table-cell">{stay.beds}</td>
            </tr>
            <tr className="table-row odd:bg-slate-100">
              <td className="table-cell">Rating</td>
              <td className="table-cell">
                <div className="flex items-center">
                  {stay.rating} <AiFillStar className="text-salmon" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
