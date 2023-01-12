import React, { useEffect, useState } from "react";
import { Board } from "./components";
import "./App.sass";

function App() {
    const [score, setScore] = useState(0);
    const [matrix, setMatrix] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);

    const addRandomNumber = (m: number[][]) => {
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);

        while (m[x][y] != 0) {
            x = Math.floor(Math.random() * 4);
            y = Math.floor(Math.random() * 4);
        }

        let newMatrix = m.map(function (arr) {
            return arr.slice();
        });

        newMatrix[x][y] = 2;

        return newMatrix;
    };

    const initializeBoard = () => {
        let matrixFirstNum = addRandomNumber(matrix);
        let matrixSecondNum = addRandomNumber(matrixFirstNum);

        setMatrix(matrixSecondNum);
    };

    const compareBoards = (m1: number[][], m2: number[][]) => {
        for (let i = 0; i < m1.length; i++) {
            for (let j = 0; j < m1[i].length; j++) {
                if (m1[i][j] != m2[i][j]) {
                    return false;
                }
            }
        }

        return true;
    };

    const shiftBoardRight = () => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 1; j--) {
                if (newMatrix[i][j] != 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newMatrix[i][k] == newMatrix[i][j]) {
                            newMatrix[i][j] += newMatrix[i][k];
                            setScore(score + newMatrix[i][j]);
                            newMatrix[i][k] = 0;

                            break;
                        } else if (newMatrix[i][k] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 3; j >= 1; j--) {
                if (newMatrix[i][j] == 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newMatrix[i][k] != 0) {
                            newMatrix[i][j] = newMatrix[i][k];
                            newMatrix[i][k] = 0;

                            break;
                        }
                    }
                }
            }
        }

        if (!compareBoards(newMatrix, matrix)) {
            newMatrix = addRandomNumber(newMatrix);
            setMatrix(newMatrix);
        }
    };

    const shiftBoardLeft = () => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (newMatrix[i][j] != 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newMatrix[i][k] == newMatrix[i][j]) {
                            newMatrix[i][j] += newMatrix[i][k];
                            setScore(score + newMatrix[i][j]);
                            newMatrix[i][k] = 0;

                            break;
                        } else if (newMatrix[i][k] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 0; j < 3; j++) {
                if (newMatrix[i][j] == 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newMatrix[i][k] != 0) {
                            newMatrix[i][j] = newMatrix[i][k];
                            newMatrix[i][k] = 0;

                            break;
                        }
                    }
                }
            }
        }

        if (!compareBoards(newMatrix, matrix)) {
            newMatrix = addRandomNumber(newMatrix);
            setMatrix(newMatrix);
        }
    };

    const shiftBoardUp = () => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (newMatrix[j][i] != 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newMatrix[k][i] == newMatrix[j][i]) {
                            newMatrix[j][i] += newMatrix[k][i];
                            setScore(score + newMatrix[j][i]);
                            newMatrix[k][i] = 0;

                            break;
                        } else if (newMatrix[k][i] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 0; j < 3; j++) {
                if (newMatrix[j][i] == 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newMatrix[k][i] != 0) {
                            newMatrix[j][i] = newMatrix[k][i];
                            newMatrix[k][i] = 0;

                            break;
                        }
                    }
                }
            }
        }

        if (!compareBoards(newMatrix, matrix)) {
            newMatrix = addRandomNumber(newMatrix);
            setMatrix(newMatrix);
        }
    };

    const shiftBoardDown = () => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 1; j--) {
                if (newMatrix[j][i] != 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newMatrix[k][i] == newMatrix[j][i]) {
                            newMatrix[j][i] += newMatrix[k][i];
                            setScore(score + newMatrix[j][i]);
                            newMatrix[k][i] = 0;

                            break;
                        } else if (newMatrix[k][i] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 3; j >= 1; j--) {
                if (newMatrix[j][i] == 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newMatrix[k][i] != 0) {
                            newMatrix[j][i] = newMatrix[k][i];
                            newMatrix[k][i] = 0;

                            break;
                        }
                    }
                }
            }
        }

        if (!compareBoards(newMatrix, matrix)) {
            newMatrix = addRandomNumber(newMatrix);
            setMatrix(newMatrix);
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key == "ArrowRight") {
            shiftBoardRight();
        } else if (e.key == "ArrowLeft") {
            shiftBoardLeft();
        } else if (e.key == "ArrowUp") {
            shiftBoardUp();
        } else if (e.key == "ArrowDown") {
            shiftBoardDown();
        }
    };

    useEffect(() => {
        initializeBoard();
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [matrix]);

    return (
        <div className="App">
            <h2>Score: {score}</h2>
            <Board matrix={matrix} />
        </div>
    );
}

export default App;
