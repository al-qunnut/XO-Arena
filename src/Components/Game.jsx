import { useState } from "react";
import { boxes } from "./Local"

const Game = () => {
  const [ currentPlayer, setCurrentPlayer ] = useState('X')
  const [ allBoxes, setAllBoxes ] = useState(boxes)

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
   setCurrentPlayer("O")} else {setCurrentPlayer("X")}
  setAllBoxes(updatedBoxes);
};

  return (
    <div className='m-auto mt-40 w-[70vw] md:w-90 h-90 border text-white'>
    <div className="grid grid-cols-3">
     {allBoxes.map((box) =>
      <ul className='' key={box.id} >
        <li className="border h-30 h-2" onClick={() => handleValue(box.id)}>{box.value}</li>
      </ul>
     )}
    </div>
    </div>
  )
}

export default Game
