import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useEffect } from "react";
import { boxes } from "./Local"

const Game = ({ setScoreX, setScoreO, gameMode }) => {
    const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const [ currentPlayer, setCurrentPlayer ] = useState('X')
  const [ allBoxes, setAllBoxes ] = useState(boxes)
  const [ win, setWin ] = useState(false)
  const [ winner, setWinner ] = useState(null) 
  const [ isAiThinking, setIsAiThinking ] = useState(false)

  useEffect(() => {
    if (currentPlayer === 'O' && !win && gameMode === 'ai') {
      makeAiMove();
    }
  }, [currentPlayer, win, gameMode]);

  const makeAiMove = async () => {
    setIsAiThinking(true);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const boardState = allBoxes.map(box => box.value || '-').join('');
      
      const prompt = `You are playing Tic-Tac-Toe as player O. 
      Current board state (9 positions, read left to right, top to bottom):
      ${boardState}
      
      Where: X = player X, O = player O (you), - = empty
      
      Positions are numbered 0-8:
      0 1 2
      3 4 5
      6 7 8
      
      Analyze the board and make the best move. Consider:
      1. Win if you can
      2. Block opponent from winning
      3. Take center if available
      4. Take corners
      
      Respond with ONLY a single number (0-8) for your chosen position. No explanation.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiMove = parseInt(response.text().trim());
      
      if (aiMove >= 0 && aiMove <= 8 && allBoxes[aiMove].value === "") {
        handleValue(aiMove);
      } else {
        const emptyBoxes = allBoxes.filter(box => box.value === "");
        if (emptyBoxes.length > 0) {
          const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
          handleValue(randomBox.id);
        }
      }
    } catch (error) {
      console.error("AI move error:", error);
      const emptyBoxes = allBoxes.filter(box => box.value === "");
      if (emptyBoxes.length > 0) {
        const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        handleValue(randomBox.id);
      }
    } finally {
      setIsAiThinking(false);
    }
  };


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
      {/* Display current mode */}
      <div className="text-center mb-4 text-xl">
        Mode: {gameMode === 'ai' ? 'Playing with AI' : 'Playing with Friend'}
      </div>
      
      <div className="grid grid-cols-3">
        {allBoxes.map((box) =>
          <ul className='' key={box.id}>
            <li 
              className={`border h-20 md:h-30 text-4xl text-green-500 font-bold flex justify-center items-center ${
                (gameMode === 'ai' && (isAiThinking || currentPlayer === 'O')) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
              onClick={() => handleValue(box.id)}
            >
              {box.value}
            </li>
          </ul>
        )}
        
        {isAiThinking && (
          <div className="absolute top-50 left-50 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-4 rounded">
            AI is thinking...
          </div>
        )}
        
        {win && (
          winner ? (
            <div className="absolute top-0 right-0 z-10 h-80 w-full bg-white items-center text-green-800 p-8 flex flex-col justify-center items-center m-6 text-3xl">
              {gameMode === 'ai' ? (winner === 'X' ? 'You won!' : 'AI won!') : `${winner} is the winner for this round!`}
              <button onClick={resetGame} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
                Play Again
              </button>
            </div>
          ) : (
            <div className="absolute top-0 right-0 z-10 h-80 w-full bg-white items-center text-red-800 p-8 flex flex-col justify-center items-center m-6 text-3xl">
              It's a draw!
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