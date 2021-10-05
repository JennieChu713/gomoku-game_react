import React from "react";
import { GamePositionContext } from "../../GamePositionContext";
import Board from "../Board";
import gameComponents from "../GameComponents";
import useGame from "../../useGame";

//CSS in JS
const {
  GameTitle,
  GameWrapper,
  GameStepsTitle,
  GameSteps,
  GameStepsPresent,
  GameStepsWrapper,
  GameStepsContent,
} = gameComponents();

// render
function App() {
  const { setBlackIsNext, blackIsNext, steps, setSteps, winner } = useGame();

  return (
    <>
      <GameTitle>Gomoku Game</GameTitle>
      <GameWrapper>
        <GamePositionContext.Provider
          value={{ blackIsNext, setBlackIsNext, steps, setSteps, winner }}
        >
          <Board />
          <GameSteps>
            <GameStepsTitle>Progress</GameStepsTitle>
            <GameStepsPresent>
              {!winner
                ? `Present Move : ${blackIsNext ? "Black" : "White"}`
                : `Winner: ${winner}`}
            </GameStepsPresent>
            <GameStepsWrapper>
              {steps.map((step, index) => (
                <GameStepsContent key={`step-${index + 1}`}>
                  {`${index + 1}. ${
                    (index + 1) % 2 ? "Black" : "White"
                  } Move on: ${step.join("-")}`}
                </GameStepsContent>
              ))}
              {winner && (
                <GameStepsContent>{`${winner} Won!`}</GameStepsContent>
              )}
            </GameStepsWrapper>
          </GameSteps>
        </GamePositionContext.Provider>
      </GameWrapper>
    </>
  );
}

export default App;
