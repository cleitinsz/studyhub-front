import { Link } from 'react-router-dom';
import ListIcon from './ListIcon';
import { useContext } from 'react';
import logo from '../../public/logo.png';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
	const { user, logout, isAuthenticated } = useContext(AuthContext);

	const handleLogout = () => {
		try {
			logout();
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<header className="h-24 w-full sm:w-3/4 mx-auto flex justify-between sm:grid sm:grid-cols-3 items-center text-white text-sm sm:text-base font-sans font-medium gap-14 px-6 sm:px-0">
			<div className="w-12 h-12 rounded-full">
				<Link to={'/'}>
					<img src={logo} alt="" className="rounded-full" />
				</Link>
			</div>
			<nav className="col-span-2 justify-between hidden sm:flex ">
				<ul className="flex gap-4 lg:gap-12">
					<Link to={'/'}>
						<li className="hover:underline text-center text-sm md:text-base">
							Home
						</li>
					</Link>
					<Link to={'/scheduledmeetings'}>
						<li className="hover:underline text-center text-sm md:text-base">
							Reuniões Marcadas
						</li>
					</Link>
					<Link to={'/mymeetings'}>
						<li className="hover:underline text-center text-sm md:text-base">
							Minhas Reuniões
						</li>
					</Link>
				</ul>
				{isAuthenticated ? (
					<div className="flex divide-x">
						<pre className=" font-sans capitalize mr-2">
							{user?.name} 
						</pre>
						<button onClick={handleLogout} className="pl-2">
							Deslogar
						</button>
					</div>
				) : (
					<Link to={'/login'}>
						<p className="hover:underline text-center text-sm md:text-base">
							Login
						</p>
					</Link>
				)}
			</nav>
			<ListIcon />
		</header>
	);
};

export default Header;
