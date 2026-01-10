import { useState } from "react";
import { boxes } from "./Local"

const Game = ({ setScoreX, setScoreO }) => {
  const [ currentPlayer, setCurrentPlayer ] = useState('X')
  const [ allBoxes, setAllBoxes ] = useState(boxes)
  const [ win, setWin ] = useState(false)
  const [ winner, setWinner ] = useState(null) 

  const handleValue = (id) => {
    const foundItem = allBoxes.find(item => item.id === id)
    if (foundItem.value.length > 0) {
      return
    } 

    const updatedBoxes = allBoxes.map((box) =>
      box.id === id && box.value === "" ?
       { ...box,  value: currentPlayer }  : box
    );
  
    if (currentPlayer === "X") {
      setCurrentPlayer("O")}  
     else {setCurrentPlayer("X")};

     checkWin(updatedBoxes);
     setAllBoxes(updatedBoxes); 
  };

  const checkWin = (boxes) => {
    const firstRow = [ boxes[0].value, boxes[1].value, boxes[2].value ] 
    const secondRow = [ boxes[3].value, boxes[4].value, boxes[5].value ]
    const thirdRow = [ boxes[6].value, boxes[7].value, boxes[8].value ]

    const firstColumn = [ boxes[0].value, boxes[3].value, boxes[6].value ]
    const secondColumn = [ boxes[1].value, boxes[4].value, boxes[7].value ]
    const thirdColumn = [ boxes[2].value, boxes[5].value, boxes[8].value ]

    const rightDiagonal = [ boxes[0].value, boxes[4].value, boxes[8].value ]
    const leftDiagonal = [ boxes[2].value, boxes[4].value, boxes[6].value ]

    const checkLine = (line) => {
      if (line.every(value => value === 'X')) return 'X';
      if (line.every(value => value === 'O')) return 'O';
      return null;
    }
  
    const lines = [
      firstRow, secondRow, thirdRow,
      firstColumn, secondColumn, thirdColumn,
      rightDiagonal, leftDiagonal
    ];
  
    for (let line of lines) {
      const result = checkLine(line);
      if (result) {
        setWin(true);
        setWinner(result);
        
        if (result === 'X') {
          setScoreX(prevScore => prevScore + 1);
        } else {
          setScoreO(prevScore => prevScore + 1);
        }
        return;
      }
    }

     const isBoardFull = boxes.every(box => box.value !== "");
      if (isBoardFull) {
        setWin(true);  
        setWinner(null);  
     }
  }

  const resetGame = () => {
    setAllBoxes(boxes.map(box => ({ ...box, value: "" })));
    setWin(false);
    setWinner(null);
    setCurrentPlayer('X');
  }


  return (
    <div className='relative m-auto mt-30 p-8 md:w-100 h-70 md:h-90 text-white'>
      <div className="grid grid-cols-3">
        {allBoxes.map((box) =>
          <ul className='' key={box.id}>
            <li className="border h-20 md:h-30 text-4xl text-green-500 font-bold flex justify-center items-center" onClick={() => handleValue(box.id)}>{box.value}</li>
          </ul>
        )}
        {win && (
          winner ? (
            <div className="absolute top-0 right-0 z-10 h-80 w-full bg-white items-center text-green-800 p-8 flex flex-col justify-center items-center m-6 text-3xl">
              {winner} is the winner for this round!!!
              <button onClick={resetGame} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
                Play Again
              </button>
            </div>
          ) : (
            <div className="absolute top-0 right-0 z-10 h-80 w-full bg-white items-center text-red-800 p-8 flex flex-col justify-center items-center m-6 text-3xl">
              Nobody won this round!!!
              <button onClick={resetGame} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
                Play Again
              </button>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Game