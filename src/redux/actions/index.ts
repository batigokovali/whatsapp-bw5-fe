export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_CHATS= 'SET_CHATS'
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT'
export const SET_HISTORY = 'SET_HISTORY'
export const NEW_MESSAGE = 'NEW_MESSAGE'

const baseEndpoint = `http://localhost:3001`;
const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };


  //PUT req
export const setUserInfoAction = () => {
    return async (dispatch, getState)=> {
        try {
            let res = await fetch (baseEndpoint, options);
            if (res.ok){
                dispatch({
                    type: SET_USER_INFO,
                    payload:true,
                });
                let data = 
            }
        } catch (error) {
            
        }
  
    }
}

//GET all
export const setChatsAction = () =>{
    return async (dispatch,getState)=>{
        try {
            let res = await fetch (baseEndpoint, options);
            if (res.ok){}
        } catch (error) {
            
        }
        type: SET_CHATS,
        payload: Chat 
    }
}

//GET one by Id
export const setActiveChatAction = (chatId: string) =>{
    return{
        type: SET_ACTIVE_CHAT,
        payload: chatId
    }
}

//GET history
export const setHistoryAction = (history:object ) =>{
    return{
        type: SET_HISTORY,
        payload: history
    }
}

//POST
export const newMessageAction = (message: object) =>{
    return{
        type: NEW_MESSAGE,
        payload: message
    }
}