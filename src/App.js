import { useState } from 'react';
import { connect } from 'react-redux';
import {
	fetchStarWarsRequest,
	confirmFetchRequest,
	fetchSartWarsPlanetsRequest,
} from './actions';

import './App.css';

const mapStateToProps = ({ starWars }) => ({ starWars });

const mapDispatchToProps = (dispatch) => ({
	fetchStarWarsRequest: () => dispatch(fetchStarWarsRequest()),
	confirmFetchRequest: () => dispatch(confirmFetchRequest()),
	fetchSartWarsPlanetsRequest: () => dispatch(fetchSartWarsPlanetsRequest()),
});

function App(props) {
	const [modal, setModal] = useState(false);

	const handleFetchClick = () => {
		props.fetchStarWarsRequest();
		setModal(true);
	};

	const handleClickConfirmation = () => {
		props.confirmFetchRequest();
		setModal(false);
	};

	return (
		<div>
			<h2>Hello Redux Saga</h2>
			<div>
				{props.starWars.people.map((person, i) => (
					<h4 key={i}>{person.name}</h4>
				))}
			</div>
			<div>
				{props.starWars.planets.map((planet, i) => (
					<h4 key={i}>{planet.name}</h4>
				))}
			</div>
			<div>
				<div
					style={!modal ? { display: 'none' } : {}}
					className='modal'
				>
					<button onClick={handleClickConfirmation}>Confirm</button>
				</div>
			</div>
			<button onClick={handleFetchClick}>Load People</button>
			<button onClick={props.fetchSartWarsPlanetsRequest}>
				Load Planets
			</button>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

