import { FaTasks } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { PiStarBold } from "react-icons/pi";
import { IoHome } from "react-icons/io5";

export const DataNameMenu = [
    {name : 'Tasks' , icon: <IoHome/> , route:'task'},
    {name : 'Today' , icon: <FaTasks/> , route:'today'},
    {name : 'Important' , icon: <PiStarBold/> , route:'important'},
    {name : 'Sticky Nots' , icon: <FaRegNoteSticky/> , route:'stickyNots'},
]