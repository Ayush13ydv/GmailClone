import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"appSlice",
    initialState:{
       open:false,
       emails:[],
       selectedEmails:null,
       searchText:"",
       user:null
    },
    reducers:{
        setOpen:(state,action)=>{
            state.open = action.payload;
        },
        setEmail:(state,action)=>{
            state.emails = action.payload;
        },
        setSelectedEmail:(state,action)=>{
            state.selectedEmails = action.payload;
        },
        setSearchText:(state,action)=>{
            state.searchText = action.payload;
        },
        setUser:(state,action)=>{
            state.user = action.payload;
        }
    }
})

export const {setOpen,setEmail,setSelectedEmail,setSearchText,setUser} = appSlice.actions;
export default appSlice.reducer;