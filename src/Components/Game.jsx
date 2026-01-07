import { useState } from "react";
import { boxes } from "./Local"

const body = () => {
  const [ value, setValue ] = useState(false);

  const handleValue = (id) => {
    const chooseValue = boxes.map((box) => {
      return box.id === id ? {...box, open: !box.open} : box;
    });
    setValue(chooseValue);
  };

  return (
    <div className='m-auto mt-40 w-[70vw] md:w-90 h-90 border text-white'>
    <div className="grid grid-cols-3">
     {boxes.map((box) =>
      <ul className='' key={box.id} >
        <li className="border h-30 h-2" onClick={() => handleValue(box.id)}>{value}</li>
      </ul>
     )}
    </div>
    </div>
  )
}

export default body
