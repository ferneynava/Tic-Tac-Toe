/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { TURNS, winnerCheck } from '../constants'
import { WINNER_COMBOS } from '../constants'

import confetti from 'canvas-confetti'
const BoardContext = createContext()

function BoardProvider ({children}){
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        if (boardFromStorage) return JSON.parse(boardFromStorage)
            return Array(9).fill(null)
    })
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.X
    })
    // Null es que no hay ganador, false es que hay empate  
    const [winner, setWinner] = useState(winnerCheck.null) 

    const updateBoard = (index) => {
        // No actualizamos esta posición si ya está ocupada
        if(board[index] || winner) return
        // actualizamos el tablero
        const newBoard = [...board]
        newBoard[index] = turn // x or o
        setBoard(newBoard)
        // Cambiamos el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        // guardar aqui partida 
        window.localStorage.setItem('board', JSON.stringify(newBoard))
        window.localStorage.setItem('turn', newTurn)
    }

    const checkWinnerFrom = (boardToCheck) => {
        // revisamos todas las combinaciones ganadoras 
        // para ver si hay un ganador
        for (const combo of WINNER_COMBOS) {
            const [a,b,c] = combo
            if(boardToCheck[a]  && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
                return boardToCheck[a]
            }
        }
            return null
    }
        
        const checkEndGame = (boardToCheck) => {
            return boardToCheck.every((square) => square !== null)
        }

        // Revisamos si hay un ganador
        useEffect(() => {
            const newWinner = checkWinnerFrom(board)
            if(newWinner) {
                confetti()
                setWinner(newWinner)
            } else if(checkEndGame(board)) {
                setWinner(winnerCheck.empate) // empate
            }
        }, [board])
        
        const resetGame = () => {
            setBoard(Array(9).fill(null))
            setTurn(TURNS.X)
            setWinner(winnerCheck.null)
            window.localStorage.removeItem('board')
            window.localStorage.removeItem('turn')
        }

    return (
        <BoardContext.Provider value={
            {
                board,
                turn, 
                winner, 
                updateBoard, 
                resetGame,
            }}>
            {children}
        </BoardContext.Provider>
    )
}

export {BoardProvider, BoardContext}