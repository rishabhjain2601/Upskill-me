import React from "react";
import Button from "../utils/Button";
import Card from "../utils/Card";
import { Outlet } from "react-router-dom";

const SkillRoadmap = () => {
  return (
    <div>
      <div className="title">Roadmap</div>
      <Outlet />
    </div>
  );
};

export default SkillRoadmap;
