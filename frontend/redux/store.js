import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user";
import PostManagementSlice from "./slices/postManagement";
const store = configureStore({
    reducer:{
        "user": UserSlice,
        "postManagement": PostManagementSlice
    }
})
export default store;