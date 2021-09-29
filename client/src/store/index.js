import { createSlice, configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialAuthState = {
  isLoggedIn: false,
  username:''
};

const peopleMovieResultsState = {
  details: '',
};

const movieResultsState = {
  details: '',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      var loginDetails = {
        username: action.payload,
        isLoggedIn: true
      }
      Cookies.set('information-hub-cookie', JSON.stringify(loginDetails), { expires: 2 });
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logout(state) {
      Cookies.remove('information-hub-cookie');
      state.isLoggedIn = false;
      state.username = '';
    },
  },
});

const peopleMovieResultsSlice = createSlice({
  name: 'movie',
  initialState: peopleMovieResultsState,
  reducers: {
    setMovieResults(state,action) {
      state.details = action.payload;
    }
  },
});

const movieResultsSlice = createSlice({
  name: 'movie_result',
  initialState: movieResultsState,
  reducers: {
    setMovieResults(state,action) {
      state.details = action.payload;
    }
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, movie: peopleMovieResultsSlice.reducer, movieResult: movieResultsSlice.reducer},
});

const authActions = authSlice.actions;
const peopleMovieResult = peopleMovieResultsSlice.actions;
const movieResult = movieResultsSlice.actions;
export {authActions, movieResult, peopleMovieResult};
export default store;
