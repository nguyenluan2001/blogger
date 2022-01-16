import {createSlice} from "@reduxjs/toolkit";
const initialState = {

}
const user = createSlice({
    name:"user",
    initialState,
    reducers:{
        getCurrentUser :(state, action) => {
            let user = action.payload;
            return user;
        }
    }
})
export const {getCurrentUser} = user.actions;
export default user.reducer;