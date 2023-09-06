import React, { useState } from "react";
import { db } from "./db";
import SquareCanvas from "./SquareCanvas";

function ViewSquad() {
  return (
    <>
      <div>
        <SquareCanvas />
      </div>
    </>
  );
}

export default ViewSquad;
