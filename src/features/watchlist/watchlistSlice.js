import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchListData: null,
  watchListMovies: null,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.watchListData = action.payload.watchListData;
    },
    setWatchlistMovies: (state, action) => {
      state.watchListMovies = action.payload.watchListMovies;
    },
  },
});

export const { setWatchlist, setWatchlistMovies } = watchlistSlice.actions;

export const selectWatchList = (state) => state.watchlist.watchListData;
export const selectWatchListMovies = (state) => state.watchlist.watchListMovies;

export default watchlistSlice.reducer;
