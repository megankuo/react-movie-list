import Homepage from './Components/Homepage';
import About from './Components/About'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/about'>About</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path='/' exact={true} element={<Homepage/>}></Route>
				<Route path='/about' element={<About/>}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
