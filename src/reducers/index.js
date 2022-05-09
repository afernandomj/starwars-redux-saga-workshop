import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
	people: [],
	planets: [],
};

const handleStarWarsSuccess = (state, action) => {
	console.log('handleStarWarsSuccess', action);
	return {
		...state,
		people: action.data,
	};
};

const handleStarWarsPlanetSuccess = (state, action) => {
	return {
		...state,
		planets: action.data,
	};
};

const starWars = (state = initialState, action) => {
	const handlers = {
		[types.FETCH_STAR_WARS_SUCCESS]: handleStarWarsSuccess,
		[types.FETCH_STAR_WARS_PLANETS_SUCCESS]: handleStarWarsPlanetSuccess,
	};
	return handlers[action.type] ? handlers[action.type](state, action) : state;
};

const rootReducer = combineReducers({
	starWars,
});

export default rootReducer;

