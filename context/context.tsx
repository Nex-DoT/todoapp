import React, { useReducer , Dispatch } from "react";
import { ReactNode } from "react";
import { createContext } from "react";
// 1. تغییر نام متغیر به initialState
const initialState = {};

// 2. اضافه کردن state و action به reducer
const reducer = (state:any, action:any) => {
  // عملیات reducer
  switch(action.type) {
    // case ها و عملیات های مورد نیاز
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

export default ContextProviderApp;
