import {Square} from './components/Square'
import './App.css'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { BoardContext } from './components/BoardContext'
import { useContext} from 'react'
import { ReactSVG } from 'react-svg'


function App() {
  const {resetGame, board, turn, updateBoard, winner } = useContext(BoardContext)

  return (

    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}> <ReactSVG src='../public/reload.svg'/></button>
      <section className="game">
        <Board board={board} updateBoard={updateBoard} />
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal winner = {winner} resetGame = {resetGame} />

      
    </main>
  )
}

export default App
