import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage';



interface SettingState {
    theme:'dark'|'light',
    language:String,
    loginStatus:Boolean,
    loginUserID:any
}

const InitialState : SettingState = {
    theme:'light',
    language:'English',
    loginStatus:false,
    loginUserID:null
}

const SettingsSlice = createSlice({
    name:'SettingSlice',
    initialState:InitialState,
    reducers:{
        changeTheme: (state,action)=>{
            state.theme = action.payload
        },
        changeLanguage:(state,action)=>{
            state.language = action.payload
            
        },
        changeLoginStatus:(state,action)=>{
            
            state.loginStatus = action.payload
        },
        getUserID:(state,action)=>{
            
            state.loginUserID=action.payload
        }
    
    },
    extraReducers:(builder)=>{

    }
})


export default SettingsSlice.reducer

export const {changeTheme,changeLanguage,changeLoginStatus,getUserID} = SettingsSlice.actions