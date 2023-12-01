import '../index.css'


const GameBoard = ({onSelectSquare , board }) => {

//  const[gameBoard,setGameBoard]=useState(initialValue)
 
//  const onBoardUpdate = (rowIndex , colIndex) =>{
//     setGameBoard( preValue => {
//         const updateValue = [...preValue.map(innerValue => [...innerValue])] 
//         updateValue[rowIndex][colIndex] = activePlayerSymbol
//         return updateValue
//     })
//     onSelectSquare()
//  }
 
  return (
    <ol id='game-board'>
        {board.map((row , rowIndex) => (
            // console.log(row),
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol , colIndex)=>(
                        // console.log(playerSymbol),
                        <li key={colIndex}>
                            <button onClick={()=>onSelectSquare(rowIndex , colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>

                    )
                    )}
               </ol>
            </li>
        ))}
    </ol>
  )
}

export default GameBoard