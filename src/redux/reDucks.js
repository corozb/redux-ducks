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
		case 'POKE_INFO':
			return {
				...state,
				pokeDetail: action.payload,
			}
		default:
			return state
	}
}

// actions
export const getPokemons = () => async (dispatch, getState) => {
	if (localStorage.getItem('offset=0')) {
		console.log('data')
		dispatch({
			type: 'GET_POKEMONS',
			payload: JSON.parse(localStorage.getItem('offset=0')),
		})
	} else {
		console.log('...searching data')

		try {
			const res = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
			)
			console.log(res.data.results)
			dispatch({
				type: 'GET_POKEMONS',
				payload: res.data,
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export const nextPage = () => async (dispatch, getState) => {
	const { next } = getState().pokemons

	if (localStorage.getItem(next)) {
		console.log('data')
		dispatch({
			type: 'GET_POKEMONS',
			payload: JSON.parse(localStorage.getItem(next)),
		})
	} else {
		console.log('...next page')

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
}

export const prevPage = () => async (dispatch, getState) => {
	const { previous } = getState().pokemons

	if (localStorage.getItem(previous)) {
		console.log('data')
		dispatch({
			type: 'GET_POKEMONS',
			payload: JSON.parse(localStorage.getItem(previous)),
		})
	} else {
		console.log('...previous page')

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
}

export const pokeDetail = (url) => async (dispatch, getState) => {
	if (url === undefined) {
		url = 'https://pokeapi.co/api/v2/pokemon/1/'
	}

	if (localStorage.getItem(url)) {
		dispatch({
			type: 'POKE_INFO',
			payload: JSON.parse(localStorage.getItem(url)),
		})
		return
	}

	try {
		const res = await axios.get(url)

		dispatch({
			type: 'POKE_INFO',
			payload: {
				name: res.data.name,
				image: res.data.sprites.front_default,
				height: res.data.height,
				weight: res.data.weight,
			},
		})

		localStorage.setItem(
			url,
			JSON.stringify({
				name: res.data.name,
				image: res.data.sprites.front_default,
				height: res.data.height,
				weight: res.data.weight,
			})
		)
	} catch (error) {
		console.log(error)
	}
}
