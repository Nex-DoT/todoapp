import React from "react"
export type TitleType = {
  text: string , 
  size: number
}

export type MenuItemType = {
  name: string,
  text: any,
  icon: React.ReactElement,
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void,
}

export type ListTaskType ={
  name: string,
  color: string,
}

export type ClockType = {
  type: string,
  Time : string
}