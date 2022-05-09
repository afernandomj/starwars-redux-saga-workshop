import { useState } from 'react';
import { connect } from 'react-redux';
import {
	fetchStarWarsRequest,
	confirmFetchRequest,
	fetchSartWarsPlanetsRequest,
	queueChannelRequests,
} from './actions';

import './App.css';

const mapStateToProps = ({ starWars }) => ({ starWars });

const mapDispatchToProps = (dispatch) => ({
	fetchStarWarsRequest: () => dispatch(fetchStarWarsRequest()),
	confirmFetchRequest: () => dispatch(confirmFetchRequest()),
	fetchSartWarsPlanetsRequest: () => dispatch(fetchSartWarsPlanetsRequest()),
	queueChannelRequests: () => dispatch(queueChannelRequests()),
});

function App(props) {
	const [modal, setModal] = useState(false);
	const [count, setCount] = useState(0);

	const handleFetchClick = () => {
		props.fetchStarWarsRequest();
		setModal(true);
	};

	const handleQueue = () => {
		props.queueChannelRequests();
		setCount(count + 1);
	};

	const handleClickConfirmation = () => {
		props.confirmFetchRequest();
		setModal(false);
	};

	return (
		<div>
			<h2>Hello Redux Saga</h2>
			<div>
				<h3># of Button Clicks {count}</h3>
				<h3># of Saga effects {props.starWars.people}</h3>
			</div>
			{/* <div>
				{props.starWars.people.map((person, i) => (
					<h4 key={i}>{person.name}</h4>
				))}
			</div> */}
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
			<button onClick={handleQueue}>Queue Channel</button>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);





