import React, { useReducer , Dispatch, useContext } from "react";
import { ReactNode } from "react";
import { createContext } from "react";
// 1. تغییر نام متغیر به initialState
const initialState = {
  activeRoute:{
    task:true,
    today:false,
    important:false,
    stickyNots:false},
  tasks:[],
  list:[],
  notes:[],
  editor:{}
};

const reducer = (state:any, action:any) => {
  switch(action.type) {
    case 'ACTIVE':
      return {
        ...state,
        activeRoute: {
          task:false,
          today:false,
          important:false,
          stickyNots:false,
          [action.payload]:true
        }
      }
    case 'DELETETASK':
       return {
           ...state,
           tasks: state.tasks.filter((task: any) => task._id !== action.payload),
       };
    case 'SETDATA' : 
          return {
            ...state , 
            list: action.payload.list,
            tasks: action.payload.tasks,
            notes: action.payload.note,
          }
    case 'SETEDITOR': 
          return {...state , editor: action.payload};
    case 'ADDLIST':
        return {...state , list:[...state.list , action.payload]};
    case 'ADDTASK':
        return {...state , tasks:[...state.tasks , action.payload]};
    case 'ADDNOTE':
          return{...state , notes:[...state.notes , action.payload]};
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
    return { state, dispatch}
    
}

export default ContextProviderApp;