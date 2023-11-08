import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import playListCardSlice from "./slices/playListCard.slice";

export default configureStore({
    reducer: {
        user    : userSlice,
        playListCard: playListCardSlice
    }
})