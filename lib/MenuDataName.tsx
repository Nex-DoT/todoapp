import { FaTasks } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { PiStarBold } from "react-icons/pi";
import { IoHome } from "react-icons/io5";

export const DataNameMenu = [
    {name : 'Tasks' , icon: <IoHome/>},
    {name : 'Today' , icon: <FaTasks/>},
    {name : 'Important' , icon: <PiStarBold/>},
    {name : 'Sticky Nots' , icon: <FaRegNoteSticky/>},
]