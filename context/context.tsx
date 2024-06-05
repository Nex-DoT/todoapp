import React, { useReducer , Dispatch, useContext } from "react";
import { ReactNode } from "react";
import { createContext } from "react";
// 1. تغییر نام متغیر به initialState
const initialState = {
  email:'',
  tasks:[],
  list:[],
};

// 2. اضافه کردن state و action به reducer
const reducer = (state:any, action:any) => {
  // عملیات reducer
  switch(action.type) {
    case 'SETLIST': 
          return {...state , list: action.payload}
    case 'SETTASK':
          return {...state , tasks : action.payload}
    case 'ADDLIST':
        if(!state.list.find((item:any)=> item.name === action.payload.name)){
            state.list.push(action.payload);
        }
        return {...state , list:[...state.list]};
    case 'ADDTASK':
        if(!state.tasks.find((item:any)=> item.name === action.payload)) {
          state.task.push(action.payload)
        }
        return {...state , tasks:[...state.task]};
    case 'ADDEMAIL':
       return{email: action.payload}
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