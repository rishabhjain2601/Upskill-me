import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, name, link = "/" }) => {
  return (
    <Link to={link === "/" ? "" : link} target="_blank">
      <div className="flex flex-col items-center shrink">
        <div className="card drop-shadow overflow-hidden my-5">
          <img src={image} alt="" className="card-img" />
        </div>
        <span className="font-bold text-xl text-center w-[15rem]">{name}</span>
      </div>
    </Link>
  );
};

export default Card;
