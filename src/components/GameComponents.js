import styled from "styled-components";

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

export default function gameComponents() {
  return {
    GameTitle,
    GameWrapper,
    GameStepsTitle,
    GameSteps,
    GameStepsPresent,
    GameStepsWrapper,
    GameStepsContent,
  };
}
