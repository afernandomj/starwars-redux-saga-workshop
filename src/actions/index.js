import {
	actionChannel,
	call,
	cancel,
	fork,
	put,
	select,
	take,
	throttle,
} from 'redux-saga/effects';
import * as actions from './types';

export const api = (url) => fetch(url).then((res) => res.json());

export const fetchStarWarsRequest = () => ({
	type: actions.FETCH_STAR_WARS_REQUEST,
});

export const confirmFetchRequest = () => ({
	type: actions.CONFIRMATION,
});

export const queueChannelRequests = () => ({
	type: actions.QUEUE_CHANNEL_REQUESTS,
});

/*
function* handleInput() {
	// ...
}

function* watchInput() {
	yield throttle(500, 'INPUT_CHANGED', handleInput);
}
*/

export const fetchSartWarsPlanetsRequest = () => ({
	type: actions.FETCH_STAR_WARS_PLANETS_REQUEST,
});

export function* fetchPerson(action) {
	try {
		// console.log('entered to fetch person...');
		// yield take(actions.CONFIRMATION);
		// console.log('passed confirmation...');

		// yield fork(api, 'http://dog.ceo/api/breeds/list/alls');
		// fork is the same thing as call, but it doesn't block the others effects
		// this is necessary when we need to send something and no need to wait a response

		const person = yield call(api, 'https://swapi.dev/api/people/');
		yield put({
			type: actions.FETCH_STAR_WARS_SUCCESS,
			data: person.results,
		});
		// const selector = yield select((state) => state.starWars);
		// console.log('selector: ', selector);
	} catch (e) {
		console.log(e);
	}
}

export function* fetchPlanets(action) {
	try {
		console.log('entered to fetch planets...');
		const planet = yield call(api, 'https://swapi.dev/api/planets/');
		yield put({
			type: actions.FETCH_STAR_WARS_PLANETS_SUCCESS,
			data: planet.results,
		});
		console.log('fetched planets...', planet.results);
	} catch (e) {
		console.log(e);
	}
}

export function* takeOneAtMost() {
	const chan = yield actionChannel(actions.QUEUE_CHANNEL_REQUESTS);

	for (let i = 1; i >= 1; i++) {
		yield take(chan);
		yield call(api, 'https://swapi.dev/api/people/');
		yield put({
			type: actions.FETCH_STAR_WARS_SUCCESS,
			data: i,
		});
	}
}

export function* forkedFetchPerson() {
	const syncPerson = yield fork(fetchPerson);
	yield take('STOP_BACKGROUND_FETCH');
	yield cancel(syncPerson);
}

