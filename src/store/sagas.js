import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/types';
import { fetchPerson, fetchPlanets } from '../actions';

function* fetchPersonSaga() {
	console.log('entered to the saga....');
	// yield takeLatest(types.FETCH_STAR_WARS_REQUEST, fetchPerson);
	yield all([
		takeEvery(types.FETCH_STAR_WARS_REQUEST, fetchPerson),
		takeEvery(types.FETCH_STAR_WARS_PLANETS_REQUEST, fetchPlanets),
	]);
}

export default fetchPersonSaga;

