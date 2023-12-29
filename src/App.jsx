import Navbar from './components/Navbar.jsx';
import Players from './components/Players.jsx';
import Search from './components/Search.jsx';
import CreatePlayer from './components/createPlayer.jsx';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {

	return (
		<>
			<Navbar />
			<div className="wrapper">
				<Routes>
					<Route path='/create' element={<CreatePlayer />} />
					<Route path='/search' element={<Search />} />
					<Route path='/*' element={<Players />} />
				</Routes>
				<ToastContainer/>
			</div>

		</>
	)
}

export default App
