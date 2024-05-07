import React from "react"
export type TitleType = {
  text: string , 
  size: number
}
export type authSignUpType={
  username:string ,
  email:string,
  password:string
}
export type authLoginType={
  eamil:string,
  password:string
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