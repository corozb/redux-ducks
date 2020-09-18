import React from 'react'
import './App.css'
import { Provider } from 'react-redux'

import generateStore from './redux/store'
import Pokemons from './components/Pokemons'

function App() {
	const store = generateStore()

	return (
		<Provider store={store}>
			<div className='container mt-3'>
				<Pokemons />
			</div>
		</Provider>
	)
}

export default App
