import React from "react";
import styled from "styled-components";
import GoSpot from "../Go/GoSpot";
import { GamePositionContext } from "../../GamePositionContext";

// chest board
const BoardContainer = styled.section`
  margin: 2rem 0;
`;
const BoardSquare = styled.article`
  border-left: 1px solid #333333;
  border-top: 1px solid #333333;
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  &:last-child {
    border-right: 1px solid transparent;
    border-top: 1px solid transparent;
    background-color: rgb(229, 227, 203);
  }
`;

const BoardRow = styled.section`
  display: flex;
  background-color: #9d896c;

  &:last-child ${BoardSquare} {
    border-left: 1px solid transparent;
    background-color: rgb(229, 227, 203);
  }
`;

function positionList() {
  const position = [];
  for (let i = 0; i < 19; i++) {
    for (let j = 0; j < 19; j++) {
      position.push([i, j]);
    }
  }
  return position;
}

const positions = positionList();

const BoardSquares = ({ rowGroup }) => {
  const structure = [];
  for (let i = 0; i < rowGroup.length; i++) {
    structure.push(
      <BoardSquare key={`square-${rowGroup[i].join("")}`}>
        <GoSpot position={rowGroup[i]} />
      </BoardSquare>
    );
  }
  return <>{structure}</>;
};

const BoardRows = () => {
  const structure = [];
  for (let i = 0; i < positions.length; i += 19) {
    const group = positions.slice(i, i + 19);
    structure.push(
      <BoardRow key={`row-${i}`}>
        <BoardSquares rowGroup={group} />
      </BoardRow>
    );
  }
  return <>{structure}</>;
};

export default function Board() {
  return (
    <BoardContainer>
      <BoardRows />
    </BoardContainer>
  );
}
