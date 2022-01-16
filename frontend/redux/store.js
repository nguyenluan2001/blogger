import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user";
const store = configureStore({
    reducer:{
        "user": UserSlice
    }
})
export default store;