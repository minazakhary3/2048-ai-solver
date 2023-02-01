import React, { useEffect, useState } from "react";
import { Board } from "./components";
import { TileData } from "./components/Tile";
import "./App.sass";

function App() {
    const [score, setScore] = useState(0);
    const [matrix, setMatrix] = useState<TileData[][]>([
        [
            {
                currentState: {
                    value: 4,
                    row: 0,
                    column: 0,
                },
            },
            {
                currentState: {
                    value: 2,
                    row: 0,
                    column: 1,
                },
            },
            null,
            {
                currentState: {
                    value: 2,
                    row: 0,
                    column: 3,
                },
            },
        ],
        [
            {
                currentState: {
                    value: 4,
                    row: 1,
                    column: 0,
                },
            },
            {
                currentState: {
                    value: 2,
                    row: 1,
                    column: 1,
                },
            },
            null,
            {
                currentState: {
                    value: 2,
                    row: 1,
                    column: 3,
                },
            },
        ],

        [null, null, null, null],
        [null, null, null, null],
    ]);

    const [backingMatrix, setBackingMatrix] = useState([
        [4, 2, 0, 2],
        [4, 2, 0, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);

    const [animate, setAnimate] = useState(false);

    const addRandomNumber = (m: TileData[][]) => {
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);

        while (m[x][y] !== null) {
            x = Math.floor(Math.random() * 4);
            y = Math.floor(Math.random() * 4);
        }

        let newMatrix = m.map(function (arr) {
            return arr.slice();
        });

        newMatrix[x][y] = { currentState: { row: x, column: y, value: 2 } };

        return newMatrix;
    };

    const syncMatrices = (newBackingMatrix: number[][]) => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (newBackingMatrix[i][j] == 0) {
                    newMatrix[i][j] = null;
                } else {
                    newMatrix[i][j] = {
                        currentState: {
                            value: newBackingMatrix[i][j],
                            row: i,
                            column: j,
                        },
                        newState: null,
                    };
                }
            }
        }
        setBackingMatrix(newBackingMatrix);
        setMatrix(newMatrix);
    };

    const initializeBoard = () => {
        let matrixFirstNum = addRandomNumber(matrix);
        let matrixSecondNum = addRandomNumber(matrixFirstNum);

        setMatrix(matrixSecondNum);
    };

    const compareBoards = (m1: TileData[][], m2: TileData[][]) => {
        for (let i = 0; i < m1.length; i++) {
            for (let j = 0; j < m1[i].length; j++) {
                if (m1[i][j] !== m2[i][j]) {
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

        let newBackingMatrix = backingMatrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 1; j--) {
                if (newBackingMatrix[i][j] != 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newBackingMatrix[i][k] == newBackingMatrix[i][j]) {
                            newBackingMatrix[i][j] += newBackingMatrix[i][k];
                            setScore(score + newBackingMatrix[i][j]);
                            newBackingMatrix[i][k] = 0;

                            newMatrix[i][j]!.newState = {
                                value: newBackingMatrix[i][j],
                                row: i,
                                column: j,
                            };

                            newMatrix[i][j]!.mergedTile = {
                                row: i,
                                column: k,
                            };

                            break;
                        } else if (newBackingMatrix[i][k] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 3; j >= 1; j--) {
                if (newBackingMatrix[i][j] == 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newBackingMatrix[i][k] != 0) {
                            newBackingMatrix[i][j] = newBackingMatrix[i][k];
                            newBackingMatrix[i][k] = 0;

                            if (!newMatrix[i][k]?.newState) {
                                newMatrix[i][k]!.newState = {
                                    row: i,
                                    column: j,
                                    value: newBackingMatrix[i][j],
                                };
                            } else {
                                newMatrix[i][k]!.newState!.column = j;
                            }

                            break;
                        }
                    }
                }
            }

            for (let j = 3; j >= 1; j--) {
                if (newMatrix[i][j] != null) {
                    if (newMatrix[i][j]!.mergedTile) {
                        newMatrix[i][
                            newMatrix[i][j]!.mergedTile!.column
                        ]!.newState = {
                            row: i,
                            column: newMatrix[i][j]!.newState!.column,
                            value: newBackingMatrix[i][j] / 2,
                        };
                    }
                }
            }
        }

        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
            syncMatrices(newBackingMatrix);
        }, 200);

        // if (!compareBoards(newMatrix, matrix)) {
        //     newMatrix = addRandomNumber(newMatrix);
        //     setMatrix(newMatrix);
        // }
    };

    const shiftBoardLeft = () => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        let newBackingMatrix = backingMatrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (newBackingMatrix[i][j] != 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newBackingMatrix[i][k] == newBackingMatrix[i][j]) {
                            newBackingMatrix[i][j] += newBackingMatrix[i][k];
                            setScore(score + newBackingMatrix[i][j]);
                            newBackingMatrix[i][k] = 0;

                            newMatrix[i][j]!.newState = {
                                value: newBackingMatrix[i][j],
                                row: i,
                                column: j,
                            };

                            newMatrix[i][j]!.mergedTile = {
                                row: i,
                                column: k,
                            };

                            break;
                        } else if (newBackingMatrix[i][k] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 0; j < 3; j++) {
                if (newBackingMatrix[i][j] == 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newBackingMatrix[i][k] != 0) {
                            newBackingMatrix[i][j] = newBackingMatrix[i][k];
                            newBackingMatrix[i][k] = 0;

                            if (!newMatrix[i][k]?.newState) {
                                newMatrix[i][k]!.newState = {
                                    row: i,
                                    column: j,
                                    value: newBackingMatrix[i][j],
                                };
                            } else {
                                newMatrix[i][k]!.newState!.column = j;
                            }

                            break;
                        }
                    }
                }
            }

            for (let j = 0; j < 3; j++) {
                if (newMatrix[i][j] != null) {
                    if (newMatrix[i][j]!.mergedTile) {
                        newMatrix[i][
                            newMatrix[i][j]!.mergedTile!.column
                        ]!.newState = {
                            row: i,
                            column: newMatrix[i][j]!.newState!.column,
                            value: newBackingMatrix[i][j] / 2,
                        };
                    }
                }
            }
        }

        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
            syncMatrices(newBackingMatrix);
        }, 200);

        // if (!compareBoards(newMatrix, matrix)) {
        //     newMatrix = addRandomNumber(newMatrix);
        //     setMatrix(newMatrix);
        // }
    };

    const shiftBoardUp = () => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        let newBackingMatrix = backingMatrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (newBackingMatrix[j][i] != 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newBackingMatrix[k][i] == newBackingMatrix[j][i]) {
                            newBackingMatrix[j][i] += newBackingMatrix[k][i];
                            setScore(score + newBackingMatrix[j][i]);
                            newBackingMatrix[k][i] = 0;

                            newMatrix[j][i]!.newState = {
                                value: newBackingMatrix[j][i],
                                row: j,
                                column: i,
                            };

                            newMatrix[j][i]!.mergedTile = {
                                row: k,
                                column: i,
                            };

                            break;
                        } else if (newBackingMatrix[k][i] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 0; j < 3; j++) {
                if (newBackingMatrix[j][i] == 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (newBackingMatrix[k][i] != 0) {
                            newBackingMatrix[j][i] = newBackingMatrix[k][i];
                            newBackingMatrix[k][i] = 0;

                            if (!newMatrix[k][i]?.newState) {
                                newMatrix[k][i]!.newState = {
                                    row: j,
                                    column: i,
                                    value: newBackingMatrix[j][i],
                                };
                            } else {
                                newMatrix[k][i]!.newState!.row = j;
                            }

                            break;
                        }
                    }
                }
            }

            for (let j = 0; j < 3; j++) {
                if (newMatrix[j][i] != null) {
                    if (newMatrix[j][i]!.mergedTile) {
                        newMatrix[newMatrix[j][i]!.mergedTile!.row][
                            i
                        ]!.newState = {
                            row: newMatrix[j][i]!.newState!.row,
                            column: i,
                            value: newBackingMatrix[j][i] / 2,
                        };
                    }
                }
            }
        }

        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
            syncMatrices(newBackingMatrix);
        }, 200);

        // if (!compareBoards(newMatrix, matrix)) {
        //     newMatrix = addRandomNumber(newMatrix);
        //     setMatrix(newMatrix);
        // }
    };

    const shiftBoardDown = () => {
        let newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });

        let newBackingMatrix = backingMatrix.map(function (arr) {
            return arr.slice();
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 1; j--) {
                if (newBackingMatrix[j][i] != 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newBackingMatrix[k][i] == newBackingMatrix[j][i]) {
                            newBackingMatrix[j][i] += newBackingMatrix[k][i];
                            setScore(score + newBackingMatrix[j][i]);
                            newBackingMatrix[k][i] = 0;

                            newMatrix[j][i]!.newState = {
                                value: newBackingMatrix[j][i],
                                row: j,
                                column: i,
                            };

                            newMatrix[j][i]!.mergedTile = {
                                row: k,
                                column: i,
                            };

                            break;
                        } else if (newBackingMatrix[k][i] != 0) {
                            break;
                        }
                    }
                }
            }
            for (let j = 3; j >= 1; j--) {
                if (newBackingMatrix[j][i] == 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (newBackingMatrix[k][i] != 0) {
                            newBackingMatrix[j][i] = newBackingMatrix[k][i];
                            newBackingMatrix[k][i] = 0;

                            if (!newMatrix[k][i]?.newState) {
                                newMatrix[k][i]!.newState = {
                                    row: j,
                                    column: i,
                                    value: newBackingMatrix[j][i],
                                };
                            } else {
                                newMatrix[k][i]!.newState!.row = j;
                            }

                            break;
                        }
                    }
                }
            }

            for (let j = 3; j >= 0; j--) {
                if (newMatrix[j][i] != null) {
                    if (newMatrix[j][i]!.mergedTile) {
                        newMatrix[newMatrix[j][i]!.mergedTile!.row][
                            i
                        ]!.newState = {
                            row: newMatrix[j][i]!.newState!.row,
                            column: i,
                            value: newBackingMatrix[j][i] / 2,
                        };
                    }
                }
            }
        }

        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
            syncMatrices(newBackingMatrix);
        }, 200);

        // if (!compareBoards(newMatrix, matrix)) {
        //     newMatrix = addRandomNumber(newMatrix);
        //     setMatrix(newMatrix);
        // }
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
        //initializeBoard();
        console.log(matrix);
    }, [matrix]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [matrix]);

    return (
        <div className="App">
            <h2>Score: {score}</h2>
            <Board matrix={matrix} animate={animate} />
        </div>
    );
}

export default App;
