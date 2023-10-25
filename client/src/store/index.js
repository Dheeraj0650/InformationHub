import { createSlice, configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialAuthState = {
  isLoggedIn: false,
  username:'',
  teamName:''
};

const peopleMovieResultsState = {
  details: '',
};

const movieResultsState = {
  details: '',
};

const realtimeTextCardState = {
  details: '',
};

const realtimeTextState = {
  details: '',
};

const realtimeTextTeamState = {
  details: '',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      var loginDetails = {
        username: action.payload.username,
        isLoggedIn: true,
        teamName : action.payload.team_name
      }
      Cookies.set('information-hub-cookie', JSON.stringify(loginDetails), { expires: 2 });
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.teamName = action.payload.team_name;
    },
    logout(state) {
      Cookies.remove('information-hub-cookie');
      state.isLoggedIn = false;
      state.username = '';
      state.teamName = '';
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

const realtimeTextCardSlice = createSlice({
  name: 'realtimeTextCard_result',
  initialState: realtimeTextCardState,
  reducers: {
    setRealtimeTextCard(state,action) {
      state.details = action.payload;
    }
  },
});

const realtimeTextSlice = createSlice({
  name: 'realtimeText_result',
  initialState: realtimeTextState,
  reducers: {
    setRealtimeText(state,action) {
      state.details = action.payload;
    }
  },
});

const realtimeTextTeamSlice = createSlice({
  name: 'realtimeTextTeam',
  initialState: realtimeTextTeamState,
  reducers: {
    setRealtimeTextTeam(state,action) {
      state.details = action.payload;
    }
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, movie: peopleMovieResultsSlice.reducer, movieResult: movieResultsSlice.reducer, realtimeTextCardResult: realtimeTextCardSlice.reducer, realtimeTextResult: realtimeTextSlice.reducer, realtimeTextTeamResult: realtimeTextTeamSlice.reducer},
});

const authActions = authSlice.actions;
const peopleMovieResult = peopleMovieResultsSlice.actions;
const movieResult = movieResultsSlice.actions;
const realtimeTextCardResult = realtimeTextCardSlice.actions;
const realtimeTextResult = realtimeTextSlice.actions;
const realtimeTextTeamResult = realtimeTextTeamSlice.actions;

export {authActions, movieResult, peopleMovieResult, realtimeTextCardResult, realtimeTextResult, realtimeTextTeamResult};
export default store;
