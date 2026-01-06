import { boxes } from "./Local"

const body = () => {
  return (
    <div className='m-auto mt-40 w-[70vw] md:w-90 h-90  border text-white'>
     {boxes.map((box) =>
      <ul className='grid grid-cols-3' key={box.id} >
        <li className="border h-2"></li>
      </ul>
     )}
    </div>
  )
}

export default body
