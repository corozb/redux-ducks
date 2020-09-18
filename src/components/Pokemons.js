import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPokemons, nextPage, prevPage } from '../redux/reDucks'

const Pokemons = () => {
	const dispatch = useDispatch()
	const pokemons = useSelector((store) => store.pokemons.array)
	console.log(pokemons)

	return (
		<div>
			<h1>Pokemons</h1>
			<button onClick={() => dispatch(prevPage(20))}>Next</button>
			<button onClick={() => dispatch(getPokemons())}>Get Pokemons</button>
			<button onClick={() => dispatch(nextPage(20))}>Next</button>
			<ul>
				{pokemons.map((item) => (
					<li key={item.name}>{item.name}</li>
				))}
			</ul>
		</div>
	)
}

export default Pokemons
