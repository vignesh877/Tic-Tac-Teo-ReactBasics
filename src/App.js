import { useState } from "react"

import GameBoard from "./components/GameBoard"
import Players from "./components/Players"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

import {WINNING_COMBINATIONS} from './components/Winning_ports'

const PLAYERS = {
  X : 'player 1', 
  O : 'player 2' 
}

const INITIAL_VALUE = [
  [null , null , null],
  [null , null , null],
  [null , null , null]
]

function deraivedFun(gameTurns){
  let currPlayer = 'X'
      
  if( gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currPlayer = 'O'
  }
  return currPlayer;
}

function deraivedWinner(gameBoard , playerName){
  let winner;

  for(const combination of WINNING_COMBINATIONS){       // TO check the winning combination of the players 
    let firstSymbol = gameBoard[combination[0].row][combination[0].column] // combintaion is array of winning possibilities 
    let secondSymbol = gameBoard[combination[1].row][combination[1].column]
    let thirdSymbol = gameBoard[combination[2].row][combination[2].column]
  
    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = playerName[firstSymbol]  // to get the name of the player form the playername object 
    }
  }
  return winner
}

function deraivedGameBoard(gameTurns){
  let gameBoard = [...INITIAL_VALUE.map(arr => [...arr])]       // need to maintain the state as simple as possible     
  for(const turn of gameTurns){
      const {player , square} = turn
      const {row , col} = square
      gameBoard[row][col] = player
  }
  return gameBoard
}
  // ##############################  starting of app  ##############################

function App() {
 const[playerName , setPlayerName ] = useState(PLAYERS)
  const [gameTurns , setGameTurns] = useState([])
  
  const activePlayer = deraivedFun(gameTurns)
  const gameBoard = deraivedGameBoard(gameTurns)
  const winner = deraivedWinner(gameBoard , playerName) 
  let hasDraw = gameTurns.length === 9 && !winner    // 9 because total move in the board was 9 


  function handleSelectSquare(rowIndex , colIndex){   //  To change the UI of the board
    setGameTurns( prevTurns =>{
      let currPlayer = deraivedFun(prevTurns)      
      const updatedTurn = [
        {player : currPlayer , square:{row : rowIndex , col : colIndex}} , ...prevTurns
      ]

      return updatedTurn
      }
    )
  }

  const handleRematch = ()=>{   // To make the gameboard to initaial state
    setGameTurns([])
  }

  const handlePlayerName  = (symbol , newName) =>{  // to update the changed name
    setPlayerName(prev =>{return{
      ...prev ,
      [symbol] : newName
    }})
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players initialName="player 1" symbol="X" isActive={activePlayer === 'X'}  onPlayerChange = {handlePlayerName}/>
          <Players initialName="player 2" symbol="O" isActive={activePlayer === 'O'} onPlayerChange = {handlePlayerName}/>          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch = {handleRematch}/>}
        <GameBoard onSelectSquare = {handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
    )
}

export default App
