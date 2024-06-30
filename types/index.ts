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
  text: any,
  icon: React.ReactElement,
}

export type ListTaskType ={
  name: string,
  color: string,
}

export type ClockType = {
  type: string,
  Time : string
}