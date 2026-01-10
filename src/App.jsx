import { useState } from "react"
import Navigation from "./Components/Navigation"
import ScoreBoard from "./Components/ScoreBoard"
import Game from "./Components/Game"


const App = () => {
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  return (
    <div>
      <Navigation scoreX={scoreX} scoreO={scoreO} />
      <Game setScoreX={setScoreX} setScoreO={setScoreO} />
      <ScoreBoard />
    </div>
  )
}

export default App
