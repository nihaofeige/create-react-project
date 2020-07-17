import React, { useState, useRef } from 'react';
import './style.less';
import { observer } from 'mobx-react';
import { Tag } from 'antd'
const Square = (props) => {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

const Board = (props) => {
    const win = calculateWinner(props.squares)
    console.log(win)
    function renderSquare(i) {
        return <Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)} />;
    }
    return (
        <div>
            <div className="status">{'Next player: ' + (props.xIsNext ? 'X' : 'O')}</div>
            {win?<Tag className="status" color="#87d068">{win + '赢了'}</Tag>:null}
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
const Game = () => {
    const [state, setState] = useState({
        history: [
            { squares: Array(9).fill(null), }
        ],
        xIsNext: true,
        status: ''
    });
    const handleClick = (i) => {
        const history = state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = state.xIsNext ? 'X' : 'O';
        setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !state.xIsNext,
        });
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={state.history[state.history.length - 1].squares}
                    onClick={(i) => handleClick(i)}
                    xIsNext={state.xIsNext}
                />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}


export default (observer(Game))