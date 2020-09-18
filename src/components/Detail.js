import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { pokeDetail } from '../redux/reDucks'

const Detail = () => {
	const dispatch = useDispatch()
	const pokemon = useSelector((store) => store.pokemons.pokeDetail)
	console.log('detail', pokemon)

	useEffect(() => {
		const infoPoke = () => dispatch(pokeDetail())
		infoPoke()
	}, [dispatch])

	return pokemon ? (
		<div className='card text-center text-uppercase'>
			<div className='card-body'>
				<img className='img-fluid' src={pokemon.image} alt='' />
				<h3 className='card-title'>{pokemon.name}</h3>
				<p className='card-text'>
					Height: {pokemon.height} Width: {pokemon.weight}
				</p>
			</div>
		</div>
	) : null
}

export default Detail
