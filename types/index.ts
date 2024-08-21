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
  route:string,
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

export type taskType= {
  _id?: string
  task: string,
  list: string,
  date: string,
  email: string | undefined,
  isDone: boolean,
  isImportant: boolean,
  time:string,
  description:string,
  subtask: Object,
}

export type noteType ={
  _id?: string,
  email?:string,
  name:string,
  description:string,
  color:string,
}
export type listType={
  email?:string,
  color:string,
  name:string,
}

export type menuType={
  menuOpen: boolean,
  toggleMenu: ()=>void,
}