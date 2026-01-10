import { FaPlay } from "react-icons/fa";
import { AiTwotoneSound } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";

const play = () => window.history.back();
const restart = () => window.location.reload();

export const settings = [
    { id: 1, name: "Play", icon: <FaPlay />, url: play},
    { id: 2, name: "Restart", icon: <VscDebugRestart />, url: restart},
    { id: 3, name: "Sound", icon: <AiTwotoneSound />, url: ''},
]

export const boxes = [
    { id: 1, value: ""},
    { id: 2, value: ""},
    { id: 3, value: ""},
    { id: 4, value: ""},
    { id: 5, value: ""},
    { id: 6, value: ""},
    { id: 7, value: ""},
    { id: 8, value: ""},
    { id: 9, value: ""},
]