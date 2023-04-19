import { createAsyncThunk } from "@reduxjs/toolkit";

//createAsyncThunk = three parameters: a string action type value, a payloadCreator callback, and an options object.
export const fetchUsers = createAsyncThunk("user/fetchUserData",async(thunkAPI)=>{
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