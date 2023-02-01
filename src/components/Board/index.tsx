import React from "react";
import "./styles.sass";
import Tile from "../Tile";
import { TileData } from "../Tile";

type IProps = {
    matrix: TileData[][];
    animate: boolean;
};

const Board = (props: IProps) => {
    const { matrix, animate } = props;

    return (
        <div className="board">
            <div className="tiles-grid">
                {matrix.map((row, i) => {
                    return (
                        <div className="tiles-row" key={i}>
                            {row.map((num, j) => {
                                return num != null &&
                                    num?.currentState.value > 0 ? (
                                    <Tile
                                        value={num?.currentState.value}
                                        key={i + "/" + j}
                                        data={num}
                                        animate={animate}
                                    />
                                ) : null;
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="empty-grid">
                {matrix.map((row, i) => {
                    return (
                        <div className="tiles-row" key={i}>
                            {row.map((num, j) => {
                                return (
                                    <Tile
                                        value={0}
                                        key={i + "" + j}
                                        data={{
                                            currentState: {
                                                row: i,
                                                column: j,
                                                value: 0,
                                            },
                                        }}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Board;
