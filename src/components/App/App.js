import React, { createContext, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { GamePositionContext } from "../../GamePositionContext";
import Board from "../Board";

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

const GameStepsPresent = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: underline;
  margin-bottom: 2rem;
`;

const GameStepsWrapper = styled.section`
  height: 80%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const GameStepsContent = styled.div`
  margin-left: 2rem;
  margin-bottom: 1.5rem;
`;

// const GamePositionContext = createContext();
function App() {
  const [blackIsNext, setBlackIsNext] = useState(true);
  const [steps, setSteps] = useState([]);

  // check line
  function checkLine(goSpots) {
    goSpots.sort();
    for (let i = 0; i < goSpots.length - 1; i++) {
      // horizontal
      let horizontal = [];
      let holdY = goSpots[i][0];
      let nextX = goSpots[i][1];

      // vertical
      let vertical = [];
      let holdX = goSpots[i][1];
      let nextY = goSpots[i][0];

      // cross
      let crossDecreY = [];
      let crossIncreY = [];
      let holdDecreSpot = [...goSpots[i]];
      let holdIncreSpot = [...goSpots[i]];

      for (let j = i + 1; j < goSpots.length; j++) {
        //horizontal line check
        if (holdY === goSpots[j][0] && nextX + 1 === goSpots[j][1]) {
          horizontal.push([[holdY, nextX], goSpots[j]]);
          nextX = goSpots[j][1];
        } else if (holdY !== goSpots[i][0]) {
          holdY = goSpots[i][0];
          horizontal = [];
        }

        //vertical line check
        if (holdX === goSpots[j][1] && nextY + 1 === goSpots[j][0]) {
          vertical.push([[nextY, holdX], goSpots[j]]);
          nextY = goSpots[j][0];
        } else if (holdX !== goSpots[i][1]) {
          holdX = goSpots[i][1];
          vertical = [];
        }

        // cross line check
        if (
          holdIncreSpot[0] - goSpots[j][0] === -1 &&
          holdIncreSpot[1] + 1 === goSpots[j][1]
        ) {
          crossIncreY.push([holdIncreSpot, goSpots[j]]);
          holdIncreSpot = [...goSpots[j]];
          console.log("incre", JSON.stringify(crossIncreY));
        }
        if (
          holdDecreSpot[0] - goSpots[j][0] === 1 &&
          holdDecreSpot[1] - 1 === goSpots[j][1]
        ) {
          crossDecreY.push([holdDecreSpot, goSpots[j]]);
          holdDecreSpot = [...goSpots[j]]; //need to check before
          console.log("decre", JSON.stringify(crossDecreY));
        }
        if (crossIncreY.length === 4 || crossDecreY.length === 4) {
          //return true;
          crossIncreY.length > crossDecreY.length
            ? console.log("cross", JSON.stringify(crossIncreY))
            : console.log("corss", JSON.stringify(crossDecreY));
          return true;
        }
      }
      if (horizontal.length === 4 || vertical.length === 4) {
        //return true
        horizontal.length > vertical.length
          ? console.log("hr", JSON.stringify(horizontal))
          : console.log("vr", JSON.stringify(vertical));
        return true;
      }
    }
    return null;
  }
  //victory judge function?
  function victoryJudge() {
    const black = [];
    const white = [];
    for (let i = 0; i < steps.length; i++) {
      if (i % 2) {
        white.push(steps[i]);
      } else {
        black.push(steps[i]);
      }
    }
    //console.log(JSON.stringify(black));
    //console.log(JSON.stringify(white));
    const blackWin = checkLine(black);
    const whiteWin = checkLine(white);
    if (blackWin) {
      alert("Black Won");
    } else if (whiteWin) {
      alert("white Won");
    }
  }

  if (steps.length > 8) {
    victoryJudge();
  }

  return (
    <>
      <GameTitle>Gomoku Game</GameTitle>
      <GameWrapper>
        <GamePositionContext.Provider
          value={{ blackIsNext, setBlackIsNext, steps, setSteps }}
        >
          <Board />
          <GameSteps>
            <GameStepsTitle>Progress</GameStepsTitle>
            <GameStepsPresent>{`Present Move : ${
              blackIsNext ? "Black" : "White"
            }`}</GameStepsPresent>
            <GameStepsWrapper>
              {steps.map((step, index) => (
                <GameStepsContent key={`step-${index + 1}`}>
                  {`${index + 1}. ${
                    (index + 1) % 2 ? "Black" : "White"
                  } Move on: ${step.join("-")}`}
                </GameStepsContent>
              ))}
            </GameStepsWrapper>
          </GameSteps>
        </GamePositionContext.Provider>
      </GameWrapper>
    </>
  );
}

export default App;
