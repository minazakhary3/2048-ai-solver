import React from "react";
import "./styles.sass";
import Tile from "../Tile";

type IProps = {
    matrix: number[][];
};

const Board = (props: IProps) => {
    const { matrix } = props;

    return (
        <div className="board">
            <div className="tiles-grid">
                {matrix.map((row, i) => {
                    return (
                        <div className="tiles-row" key={i}>
                            {row.map((num, j) => {
                                return <Tile value={num} key={i + "" + j} />;
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Board;
