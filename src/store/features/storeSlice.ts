import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface User {
    _id: string
    name: string
    email: string
    avatar?: string
}

export interface Message {
    sender: User;
    content: {
        text?: string;
        media?: string;
    };
    timestamp: number;
}

export interface Chat {
    members: User[];
    messages: Message[];
    history: Message[];
    chatId: string;
}

export interface Store {
    userInfo: {
        _id: string
        name: string
        email: string
        avatar?: string
    },
    chats: {
        active: string // the _id of one of the chats among store.chats.list	
        list: Chat[]
    }
}

export const initialState: Store = {
    userInfo: {
        _id: "",
        name: "",
        email: "",
        avatar: "",
    },
    chats: {
        active: "",
        list: [],
    }
}



export const fetchUsers = createAsyncThunk("user/fetch", async (thunkAPI) => {

    const response = await fetch("http://localhost:3001", {
        method: "GET"
    });
    const data = response.json();
    return data;
})

export const sendMessage = createAsyncThunk("user/save", async (message: object, thunkAPI) => {
    const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message
        })
    })
    const data = await response.json();
    return data;
})

export const StoreSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<User>) => {
            state.userInfo = action.payload; //updates the user info in the store. To use when editing the profile before sending the PUT request, as well as when logging in and retrieving the user info.
        },
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats.list = action.payload; //sets the previous conversations in the store
        },
        setActiveChat: (state, action: PayloadAction<string>) => {
            state.chats.active = action.payload; //updates the current active chat in the main chat component, which supposedly has a React.useEffect listening to this change and reacting accordingly.
        },
        setHistory: (state, action: PayloadAction<{ chatId: string; history: Message[] }>) => {
            const chat = state.chats.list.find((chat) => chat.chatId === action.payload.chatId);
            if (chat) {
                chat.history = action.payload.history;
            }
        },
        newMessage: (state, action: PayloadAction<{ chatId: string; message: Message; }>) => {
            const chat = state.chats.list.find((chat) => chat.chatId === action.payload.chatId);
            chat?.history.push(action.payload.message); //appends the message to the history of the chat with _id equal to chatId
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.chats = action.payload;
            state.userInfo = action.payload;
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.chats.list.push(action.payload)
        })
    }
})

export default StoreSlice.reducer;
export const { setUserInfo, setChats, setActiveChat, setHistory, newMessage } =
    StoreSlice.actions;