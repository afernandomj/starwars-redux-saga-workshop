import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import { fetchPerson } from '../actions';

function* fetchPersonSaga() {
	yield takeLatest(types.FETCH_STAR_WARS_REQUEST, fetchPerson);
}

export default fetchPersonSaga;

