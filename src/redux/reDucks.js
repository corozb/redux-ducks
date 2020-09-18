import axios from 'axios'

// constants
const initialData = {
	count: 0,
	next: null,
	previous: null,
	results: [],
	offset: 0,
}

// reducer
export default function reducer(state = initialData, action) {
	switch (action.type) {
		case 'GET_POKEMONS':
			return {
				...state,
				...action.payload,
			}
		case 'NEXT_PAGE':
			return {
				...state,
				...action.payload,
			}
		case 'PREV_PAGE':
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}

// actions
export const getPokemons = () => async (dispatch) => {
	try {
		const res = await axios.get(
			'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
		)
		dispatch({
			type: 'GET_POKEMONS',
			payload: res.data,
		})
	} catch (error) {
		console.log(error)
	}
}

export const nextPage = () => async (dispatch, getState) => {
	const { next } = getState().pokemons

	try {
		const res = await axios.get(next)
		dispatch({
			type: 'NEXT_PAGE',
			payload: res.data,
		})
	} catch (error) {
		console.log(error)
	}
}

export const prevPage = () => async (dispatch, getState) => {
	const { previous } = getState().pokemons

	try {
		const res = await axios.get(previous)
		dispatch({
			type: 'PREV_PAGE',
			payload: res.data,
		})
	} catch (error) {
		console.log(error)
	}
}
