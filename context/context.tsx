import React, { useReducer , Dispatch, useContext } from "react";
import { ReactNode } from "react";
import { createContext } from "react";
// 1. تغییر نام متغیر به initialState
const initialState = {
  email:'',
  username:'',
  tasks:[],
  list:[],
  notes:[],
  editor:{}
};

// 2. اضافه کردن state و action به reducer
const reducer = (state:any, action:any) => {
  // عملیات reducer
  switch(action.type) {
    case 'SETLIST': 
          return {...state , list: action.payload}
    case 'SETTASK':
          return {...state , tasks : action.payload}
    case 'SETNOTE':
          return {...state , notes : action.payload}
    case 'SETEDITOR': 
          return {...state , editor: action.payload}
    case 'SETUSERNAME': 
          return {...state , username: action.payload}
    case 'ADDLIST':
        if(!state.list.find((item:any)=> item.name === action.payload.name)){
            state.list.push(action.payload);
        }
        return {...state , list:[...state.list]};
    case 'ADDTASK':
        return {...state , tasks:[...state.tasks , action.payload]};
    case 'ADDNOTE':
          return{...state , notes:[...state.notes , action.payload]}
    case 'ADDEMAIL':
       return{...state , email: action.payload}
    case 'UPDATETASK':
       console.log('Updating Task:', action.payload);
       return {
         ...state,
         tasks: state.tasks.map((task: any) =>
           task._id === action.payload._id ? { ...task, ...action.payload } : task
         )
       }
    default:
      return state;
  }
};

const TodoApp = createContext<{ state: any; dispatch: Dispatch<any> } | undefined>(undefined);

const ContextProviderApp = ({ children }: { children: ReactNode }) => {
    // 3. استفاده صحیح از useReducer
    const [state , dispatch] = useReducer(reducer , initialState);
    return (
        <TodoApp.Provider value={{state , dispatch}}> {/* ارسال state و dispatch */}
            {children}
        </TodoApp.Provider>
    );
};
export const context = ()=>{
    const result = useContext(TodoApp);
    const {state , dispatch} = result as any;
    console.log(result);
    return { state, dispatch}
    
}

export default ContextProviderApp;