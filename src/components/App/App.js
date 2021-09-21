import React, { createContext, useContext } from "react";
import styled from "styled-components";

/* 
<root>
//1 row 19 of it
  <section class="boardRow">
    // 1 square 19 of it
    <article class="boardSquare">
      // chest placer
      <div class="chestPlacer" data-pos-section="0-0" data-occupied="false"></div>
    </article>
  </section>
</root>
*/
//CSS in JS
const GameTitle = styled.h1`
  text-align: center;
`;
const GameWrapper = styled.main`
  display: flex;
  justify-content: space-around;
  background-color: rgba(204, 199, 145, 0.5);
  height: 100vh;
`;

// chest board
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

const ChestSpot = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 60%;
  display: hidden;
  position: relative;
  top: -30%;
  left: -30%;
  text-align: center;
`;

const Board = styled.section`
  margin: 2rem 0;
`;

// chest position
const createOneDimList = () => {
  const positions = [];
  for (let i = 0; i < 19; i++) {
    positions.push(i);
  }
  return positions;
};

const yPositions = createOneDimList();
const xPositions = createOneDimList();

const BoardSquaresGroup = ({ yPosition }) => {
  const structure = xPositions.map((position) => {
    return (
      <BoardSquare>
        <ChestSpot
          yPosition={yPosition}
          xPosition={position}
          isOccupied="false"
        />
      </BoardSquare>
    );
  });
  return <>{structure}</>;
};

const BoardRowsGroup = () => {
  const structure = yPositions.map((position) => {
    return (
      <BoardRow>
        <BoardSquaresGroup yPosition={position} />
      </BoardRow>
    );
  });
  return <Board>{structure}</Board>;
};

// Go/chest component
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

// Game Progress
const GameStepsTitle = styled.h2`
  text-align: center;
`;

const GameSteps = styled.section`
  width: 40%;
  &:not(${GameStepsTitle}) {
    text-align: start;
  }
`;

const GameStepsContent = styled.div`
  font-size: 1.4rem;
`;

function App() {
  return (
    <>
      <GameTitle>Gomoku Game</GameTitle>
      <GameWrapper>
        <BoardRowsGroup />
        <GameSteps>
          <GameStepsTitle>Progress</GameStepsTitle>
          <GameStepsContent>Black go first.</GameStepsContent>
        </GameSteps>
      </GameWrapper>
    </>
  );
}

export default App;
