import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GamePositionContext } from "../../GamePositionContext";

const ChestField = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 60%;
  display: hidden;
  position: relative;
  top: -30%;
  left: -30%;
  text-align: center;
`;

const BlackGo = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: black;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.5);
  right: 0;
  top: 0;
`;

const WhiteGo = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  top: 0;
`;

export default function GoSpot({ position }) {
  const [goValue, setGoValue] = useState(null);
  const { blackIsNext, setBlackIsNext, steps, setSteps, winner } =
    useContext(GamePositionContext);
  const handleGoClick = (e) => {
    const isOccupied = e.target.getAttribute("data-occupied");
    if (isOccupied === "false" && !winner) {
      const pos = e.target.getAttribute("data-position");
      setSteps([...steps, pos.split("-").map((i) => Number(i))]);
      setGoValue(blackIsNext ? <BlackGo /> : <WhiteGo />);
      setBlackIsNext(!blackIsNext);
      e.target.setAttribute("data-occupied", true);
    }
  };

  return (
    <ChestField
      data-position={position.join("-")}
      data-occupied="false"
      onClick={handleGoClick}
    >
      {goValue}
    </ChestField>
  );
}
