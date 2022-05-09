import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';

import * as actions from '../../actions/types';
import { fetchPerson, api, forkedFetchPerson } from '../../actions/index';

describe('fetchPerson', () => {
	const personGenerator = fetchPerson();

	it('should call the api', () => {
		expect(personGenerator.next().value).toEqual(
			call(api, 'https://swapi.dev/api/people/')
		);
	});

	it('on success dispatch action', () => {
		const person = { results: [] };
		expect(personGenerator.next(person).value).toEqual(
			put({
				type: actions.FETCH_STAR_WARS_SUCCESS,
				data: person.results,
			})
		);
	});
});

describe('forkedFetchPerson', () => {
	const forkedGenerator = forkedFetchPerson();

	it('forks the service', () => {
		const expectedYield = fork(fetchPerson);
		expect(forkedGenerator.next().value).toEqual(expectedYield);
	});

	it('waits for stop action and then cancels the service', () => {
		const mockTask = createMockTask();
		const expectedTakeYield = take('STOP_BACKGROUND_FETCH');
		expect(forkedGenerator.next(mockTask).value).toEqual(expectedTakeYield);

		const expectedCancelYield = cancel(mockTask);
		expect(forkedGenerator.next().value).toEqual(expectedCancelYield);
	});
});

