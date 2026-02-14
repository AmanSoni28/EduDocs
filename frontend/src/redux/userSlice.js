import { createSlice, current } from "@reduxjs/toolkit";

const initialState={
    userData:null,
    allPdfs:[],
    currentUserPdfs:[]
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData:(state,action)=>{
          state.userData=action.payload
        },
        setAllPdfs:(state,action)=>{
          state.allPdfs=action.payload
        },
        setCurrentUserPdfs:(state,action)=>{
          state.currentUserPdfs=action.payload
        }
    }
})

export const {setUserData,setAllPdfs,setCurrentUserPdfs} = userSlice.actions
export default userSlice.reducer  