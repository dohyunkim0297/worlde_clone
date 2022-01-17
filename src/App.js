import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import fiveLetterWords from "./fiveLetterWords";

function App() {
  const [wordGrid, setWordGrid] = useState([]);
  const [currentFocusedRow, setCurrentFocusedRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const solution = "width";

  useEffect(() => {
    function initializeWordGrid() {
      let newWordGrid = [];
      for (let i = 0; i < 6; i++) {
        newWordGrid.push([]);
      }

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
          newWordGrid[i].push({ letter: "", status: "empty" }); // States: empty, incorrect, wrongposition, correct
        }
      }

      setWordGrid(newWordGrid);
    }
    if (wordGrid.length === 0) {
      initializeWordGrid();
    }
  }, [wordGrid]);

  const handleTextBoxChange = (event, rowIndex, colIndex) => {
    const newWordGrid = [...wordGrid];
    newWordGrid[rowIndex][colIndex].letter = event.target.value;
    setWordGrid(newWordGrid);
  };

  const handleSubmit = () => {
    const wordGridCopy = [...wordGrid];
    const currentWord = wordGridCopy[currentFocusedRow];
    for (let i = 0; i < 5; i++) {
      console.log("currentWord[i]", currentWord[i].letter);
      console.log("solution[i]", solution[i]);
      if (currentWord[i].letter === solution[i]) {
        currentWord[i].status = "correct";
      } else if (solution.includes(currentWord[i].letter)) {
        currentWord[i].status = "wrongposition";
      } else {
        currentWord[i].status = "incorrect";
      }
    }

    let isCorrect = true;
    for (let i = 0; i < 5; i++) {
      if (currentWord[i].status !== "correct") {
        isCorrect = false;
        setCurrentFocusedRow(currentFocusedRow + 1);
      }
    }

    setIsGameOver(isCorrect);
  };

  return (
    <Div>
      {isGameOver && <h1>You Win!</h1>}
      {!isGameOver &&
        wordGrid.map((row, rowIndex) => {
          return (
            <BlockWrapper>
              {row.map((column, colIndex) => {
                return (
                  <LetterBox
                    status={wordGrid[rowIndex][colIndex].status}
                    value={wordGrid[rowIndex][colIndex].letter}
                    onChange={(event) =>
                      handleTextBoxChange(event, rowIndex, colIndex)
                    }
                  />
                );
              })}
            </BlockWrapper>
          );
        })}
      <SubmitButton onClick={handleSubmit}> Submit </SubmitButton>
    </Div>
  );
}

const BlockWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Div = styled.div`
  text-align: center;
  display: flex;
  justify-conteent: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const LetterBox = styled.input`
  font-size: 56px;
  background-color: ${(props) => {
    if (props.status === "incorrect") {
      return "#f5f5f5";
    } else if (props.status === "wrongposition") {
      return "yellow";
    } else if (props.status === "correct") {
      return "green";
    }
  }};
  padding: 16px;
  width: 40px;
  height: 40px;
`;

const SubmitButton = styled.button`
  font-size: 36px;
  border-radius: 4px;
  background-color: grey;
`;

export default App;
