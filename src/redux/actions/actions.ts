import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { Dispatch } from "redux";
import { StoreSlice } from "../reducers/storeSlice";

export const fetchUsers = () => {
    return async (dispatch: Dispatch) => {
            try {
        
        const response = await fetch("http://localhost:3001/users",{
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}

        });
        const data=await response.json();
        console.log(data)
        dispatch({
            type: StoreSlice.actions.setUsers,
            payload: data,
        })
        return data;   
    } catch (error) {
        console.log(error)
    }
    }
}

export const sendMessage = createAsyncThunk("user/save", async (message:object,thunkAPI)=>{
    try {
        
        const response = await fetch("http://localhost:3001",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message
            })
        })
        const data=await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
})

export const fetchChat = createAsyncThunk("user/fetchChat",async(thunkAPI)=>{
    try {
        const response = await fetch("http://localhost:3001",{
            method:"GET"
        });
        const data=response.json();
        return data;   
    } catch (error) {
        console.log(error)
    }
})

export const fetchHistory = createAsyncThunk("user/fetchHistory",async(chatId:string, thunkAPI)=>{
    try {
        const response = await fetch("http://localhost:3001",{
            method:"GET"
        });
        const data=response.json();
        return data;   
    } catch (error) {
        console.log(error)
    }
})