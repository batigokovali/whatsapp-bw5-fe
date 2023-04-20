import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { Dispatch } from "redux";
import { StoreSlice, User } from "../reducers/storeSlice";

//Fetches all the users
export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      if (!data.message)
        dispatch({
          type: StoreSlice.actions.setUsers,
          payload: data,
        });
      else console.log(data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

//Fetches the info of the user that just login
export const fetchUserInfo = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      dispatch({
        type: StoreSlice.actions.setUserInfo,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

//To edit the user info
export const editUserInfo = (info: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      dispatch({
        type: StoreSlice.actions.setUserInfo,
        payload: data,
      });
      fetchUsers();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

//To change the user avatar
export const editUserAvatar = (file: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/me/avatar", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: file,
      });
      const data = await response.json();
      console.log(data);
      dispatch({
        type: StoreSlice.actions.setUserInfo,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendMessage = createAsyncThunk(
  "user/save",
  async (message: object, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchChat = createAsyncThunk(
  "user/fetchChat",
  async (thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001", {
        method: "GET",
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchHistory = createAsyncThunk(
  "user/fetchHistory",
  async (chatId: string, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001", {
        method: "GET",
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
