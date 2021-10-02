import { useEffect, useState } from "react";

// crossline expect combo
function slopeLineExpect(coordinate, direction = "decrease-x") {
  const [y, x] = coordinate;
  const spotsCombo = [];
  for (let i = 0; i < 5; i++) {
    let xSpot =
      (direction === "decrease-x" && x - i) ||
      (direction === "increase-x" && x + i);
    if (!xSpot) {
      return;
    }
    spotsCombo.push(`${y + i}-${xSpot}`);
  }
  return spotsCombo;
}
// linearline expect combo
function linearLineExpect(coordinate, direction = "horizontal") {
  const [y, x] = coordinate;
  const spotsCombo = [];
  for (let i = 0; i < 5; i++) {
    if (direction === "horizontal") {
      spotsCombo.push(`${y}-${x + i}`);
    } else if (direction === "vertical") {
      spotsCombo.push(`${y + i}-${x}`);
    } else {
      return;
    }
  }
  return spotsCombo;
}

function checkWinner(goSpots) {
  goSpots.sort();

  for (let i = 0; i < goSpots.length; i++) {
    const crossRightCombo = slopeLineExpect(goSpots[i], "increase-x");
    const crossLeftCombo = slopeLineExpect(goSpots[i], "decrease-x");
    const horizontalCombo = linearLineExpect(goSpots[i], "horizontal");
    const verticalCombo = linearLineExpect(goSpots[i], "vertical");

    const crossRightFit = [];
    const crossLeftFit = [];
    const horizontalFit = [];
    const verticalFit = [];
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < goSpots.length; k++) {
        const compare = goSpots[k].join("-");
        if (crossRightCombo[j] === compare) {
          crossRightFit.push(compare);
        }
        if (crossLeftCombo[j] === compare) {
          crossLeftFit.push(compare);
        }
        if (horizontalCombo[j] === compare) {
          horizontalFit.push(compare);
        }
        if (verticalCombo[j] === compare) {
          verticalFit.push(compare);
        }
      }
    }
    if (
      crossRightFit.length === 5 ||
      crossLeftFit.length === 5 ||
      horizontalFit.length === 5 ||
      verticalFit.length === 5
    ) {
      console.log("there is a fit");
      return true;
    }
  }
  return null;
}

export default function useGame() {
  const [blackIsNext, setBlackIsNext] = useState(true);
  const [steps, setSteps] = useState([]);
  const [winner, setWinner] = useState(null);

  //victory judge function
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
    const blackWin = checkWinner(black);
    const whiteWin = checkWinner(white);
    if (blackWin) {
      alert("Black Won");
      setWinner("Black");
    } else if (whiteWin) {
      alert("white Won");
      setWinner("White");
    }
  }

  useEffect(() => {
    if (steps.length > 8 && !winner) {
      victoryJudge();
    }
  }, [steps]);

  return {
    blackIsNext,
    setBlackIsNext,
    steps,
    setSteps,
    winner,
    setWinner,
  };
}
