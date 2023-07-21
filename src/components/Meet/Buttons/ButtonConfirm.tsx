import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { api } from '../../../lib/axios';
import { IMeet } from '../../../types/Meet';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const ButtonConfirm = (meet: IMeet) => {
	const { user, isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	const isAuth = () => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	};
	async function onSubmit() {
		try {
			await api.post('meetings/confirm-presence', { idMeeting: meet._id });
			alert('Reunião marcada!');
			window.location.reload();
		} catch (error) {
			if (
				(error as AxiosError).response &&
				(error as AxiosError).response?.status === 412
			) {
				alert(
					'Você não pode marcar uma reunião que você criou ou que você ja marcou!'
				);
			} else {
				console.log(error);
			}
		}
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<button
					className="bg-gray-700 text-white font-medium px-4 py-3 rounded-lg"
					onClick={() => isAuth()}
				>
					Marcar
				</button>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0" />
				<AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-50 p-[25px] shadow focus:outline-none">
					<AlertDialog.Title className="m-0 text-[17px] font-medium">
						Marcar Reunião
					</AlertDialog.Title>
					<AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
						Você realmente deseja se inscrever nessa reunião?
					</AlertDialog.Description>
					<div className="flex items-center justify-end gap-[25px]">
						<AlertDialog.Cancel asChild>
							<button className="font-medium bg-gray-700 border-2 border-gray-700 p-2 rounded-lg text-white hover:bg-white hover:text-black">
								Cancelar
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								className="font-medium border-2 border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-white"
								onClick={onSubmit}
							>
								Marcar
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};
export default ButtonConfirm;
