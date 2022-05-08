import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
	people: [],
};

const handleStarWarsSuccess = (state, action) => {
	return {
		...state,
		people: action.data,
	};
};

const starWars = (state = initialState, action) => {
	const handlers = {
		[types.FETCH_STAR_WARS_SUCCESS]: handleStarWarsSuccess,
	};
	return handlers[action.type] ? handlers[action.type](state, action) : state;
};

const rootReducer = combineReducers({
	starWars,
});

export default rootReducer;

