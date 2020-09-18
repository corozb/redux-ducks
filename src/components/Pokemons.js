import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPokemons, nextPage, prevPage } from '../redux/reDucks'

const Pokemons = () => {
	const dispatch = useDispatch()
	const pokemons = useSelector((store) => store.pokemons.results)
	const next = useSelector((store) => store.pokemons.next)
	const previous = useSelector((store) => store.pokemons.previous)

	console.log('pokemons', pokemons.length)

	return (
		<div>
			<h1>Pokemons</h1>
			{previous && (
				<button onClick={() => dispatch(prevPage())}>Previous</button>
			)}
			{pokemons.length === 0 && (
				<button onClick={() => dispatch(getPokemons())}>Get Pokemons</button>
			)}
			{next && <button onClick={() => dispatch(nextPage())}>Next</button>}
			<ul>
				{pokemons.map((item) => (
					<li key={item.name}>{item.name}</li>
				))}
			</ul>
		</div>
	)
}

export default Pokemons
