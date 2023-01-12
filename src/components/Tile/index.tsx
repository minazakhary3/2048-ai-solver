import React from "react";
import "./styles.sass";

type IProps = {
    value: number;
};

const colors = {
    0: "#cdc1b4",
    2: "#eee4da",
    4: "#eee1c9",
    8: "#f3b27a",
    16: "#f69664",
    32: "#f77e5f",
    64: "#f75f3b",
    128: "#edd073",
    256: "#edd073",
    512: "#edd073",
    1024: "#edd073",
    2048: "#edd073",
    8192: "#edd073",
    16384: "#edd073",
};

const fontColors = {
    0: "#000000",
    2: "#776e65",
    4: "#776e65",
    8: "#f9f6f2",
    16: "#f9f6f2",
    32: "#f9f6f2",
    64: "#f9f6f2",
    128: "#f9f6f2",
    256: "#f9f6f2",
    512: "#f9f6f2",
    1024: "#f9f6f2",
    2048: "#f9f6f2",
    8192: "#f9f6f2",
    16384: "#f9f6f2",
};

const EmptyTile = (props: IProps) => {
    const { value } = props;
    const style = {
        backgroundColor: `${colors[value as keyof typeof colors]}`,
        color: `${fontColors[value as keyof typeof fontColors]}`,
    };
    return (
        <div className="tile" style={style}>
            {value > 0 ? value : ""}
        </div>
    );
};

export default EmptyTile;
