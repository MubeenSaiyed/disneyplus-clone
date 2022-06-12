import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import movieReducer from "../features/movie/movieSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    watchlist: watchlistReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
