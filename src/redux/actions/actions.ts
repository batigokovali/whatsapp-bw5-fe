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
      else alert(data.message);
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

//Fetches all the chats
export const fetchChats = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/chats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      if (!data.message)
        dispatch({
          type: StoreSlice.actions.setChats,
          payload: data,
        });
      else alert(data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

//Create 1-1 room
export const createRoom = (recipient: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/chats", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ recipient }),
      });
      const data = await response.json();
      console.log(data);
      dispatch({
        type: StoreSlice.actions.setActiveChat,
        payload: data._id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};
