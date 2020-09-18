import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPokemons, nextPage, prevPage, pokeDetail } from '../redux/reDucks'
import Detail from './Detail'

const Pokemons = () => {
	const dispatch = useDispatch()
	const pokemons = useSelector((store) => store.pokemons.results)
	const next = useSelector((store) => store.pokemons.next)
	const previous = useSelector((store) => store.pokemons.previous)

	return (
		<div className='row'>
			<div className='col-md-6'>
				<h1>Pokemons</h1>

				<div className='d-flex justify-content-between'>
					{previous && (
						<button
							className='btn btn-dark'
							onClick={() => dispatch(prevPage())}>
							Previous
						</button>
					)}
					{pokemons.length === 0 && (
						<button
							className='btn btn-dark'
							onClick={() => dispatch(getPokemons())}>
							Get Pokemons
						</button>
					)}
					{next && (
						<button
							className='btn btn-dark mr-2'
							onClick={() => dispatch(nextPage())}>
							Next
						</button>
					)}
				</div>

				<ul className='list-group mt-3 text-uppercase'>
					{pokemons.map((item) => (
						<li className='list-group-item' key={item.name}>
							{item.name}
							<button
								className='btn btn-dark btn-sm float-right'
								onClick={() => dispatch(pokeDetail(item.url))}>
								Show
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className='col-md-6'>
				<Detail />
			</div>
		</div>
	)
}

export default Pokemons
