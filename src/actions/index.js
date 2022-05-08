import { call, put, take } from 'redux-saga/effects';
import * as actions from './types';

export const api = (url) => fetch(url).then((res) => res.json());

export const fetchStarWarsRequest = () => ({
	type: actions.FETCH_STAR_WARS_REQUEST,
});

export const confirmFetchRequest = () => ({
	type: actions.CONFIRMATION,
});

export function* fetchPerson(action) {
	try {
		console.log('entered to fetch person...');
		yield take(actions.CONFIRMATION);
		console.log('passed confirmation...');

		const person = yield call(api, 'https://swapi.dev/api/people/');
		yield put({
			type: actions.FETCH_STAR_WARS_SUCCESS,
			data: person.results,
		});
	} catch (e) {
		console.log(e);
	}
}

