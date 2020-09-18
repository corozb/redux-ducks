import axios from 'axios'

// constants
const initialData = {
	array: [],
	offset: 0,
}

// reducer
export default function reducer(state = initialData, action) {
	switch (action.type) {
		case 'GET_POKEMONS':
			return {
				...state,
				array: action.payload,
			}
		case 'NEXT_PAGE':
			return {
				...state,
				array: action.payload.array,
				offset: action.payload.offset,
			}
		case 'PREV_PAGE':
			return {
				...state,
				array: action.payload.array,
				offset: action.payload.offset,
			}
		default:
			return state
	}
}

// actions
export const getPokemons = () => async (dispatch, getState) => {
	const { offset } = getState().pokemons

	try {
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
		)
		dispatch({
			type: 'GET_POKEMONS',
			payload: res.data.results,
		})
	} catch (error) {
		console.log(error)
	}
}

export const nextPage = (pagination) => async (dispatch, getState) => {
	const { offset } = getState().pokemons
	const next = offset + pagination

	try {
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`
		)
		dispatch({
			type: 'NEXT_PAGE',
			payload: {
				array: res.data.results,
				offset: next,
			},
		})
	} catch (error) {
		console.log(error)
	}
}

export const prevPage = (pagination) => async (dispatch, getState) => {
	const { offset } = getState().pokemons
	const prev = offset - pagination

	try {
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?offset=${prev}&limit=20`
		)
		dispatch({
			type: 'PREV_PAGE',
			payload: {
				array: res.data.results,
				offset: prev,
			},
		})
	} catch (error) {
		console.log(error)
	}
}
