import { configureStore } from "@reduxjs/toolkit";
import { StoreSlice } from "./features/storeSlice";
import { TypedUseSelectorHook, useDispatch,useSelector  } from "react-redux";

export const store=configureStore({
    reducer:{
        store: StoreSlice.reducer
    }
})

export const useAppDispatch: ()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector