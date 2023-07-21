import {
	AddressBook,
	ChalkboardTeacher,
	House,
	List,
	SignIn,
	Users,
} from '@phosphor-icons/react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ListIcon = () => {
	const { user, isAuthenticated, logout } = useContext(AuthContext);
	const [opened, setOpened] = useState(false);

	const handleLogout = () => {
		try {
			logout();
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className="flex sm:hidden relative z-10"
			onClick={() => {
				setOpened(!opened);
			}}
		>
			<List size={32} color="#fff" weight="bold" />
			{opened && (
				<div className="bg-slate-800 flex flex-col shadow-md w-48 rounded-md absolute top-8 py-1 right-0 divide-y divide-slate-600">
					{user && (
						<div className="p-3 flex items-center gap-2">
							<House size={22} weight="bold" />

							<pre className="text-white font-semibold font-sans capitalize">
								{user?.name} - {user?.course.unit.name}
							</pre>
						</div>
					)}
					<ul className="text-white font-semibold p-3 flex flex-col gap-3">
						<Link to={'/'} className="">
							<li className="flex gap-2 items-center">Home</li>
						</Link>
						<Link to={'/scheduledmeetings'}>
							<li className="flex gap-2 items-center">Reuniões Marcadas</li>
						</Link>
						<Link to={'/mymeetings'}>
							<li className="flex gap-2 items-center">Minhas Reuniões</li>
						</Link>
					</ul>
					{isAuthenticated ? (
						<button
							className="text-start text-red-500 hover:bg-red-200 p-3"
							onClick={handleLogout}
						>
							Deslogar
						</button>
					) : (
						<Link to={'/login'}>
							<p className="flex gap-2 items-center text-white p-3">
								<SignIn size={24} color="#fff" weight="bold" />
								Login
							</p>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default ListIcon;
