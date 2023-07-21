import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { IMeet } from '../../../types/Meet';
import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';

const ButtonDisconfirm = (meet: IMeet) => {
	async function onSubmit() {
		try {
			await api.post('meetings/cancel-presence', { idMeeting: meet._id });
			alert('Reunião desmarcada!');
			window.location.reload();
		} catch (error) {
			if (
				(error as AxiosError).response &&
				(error as AxiosError).response?.status === 412
			) {
				alert('Você não pode desmarcar uma reunião que você criou!');
			} else {
				console.log(error);
			}
		}
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<button className="bg-gray-700 text-white font-medium px-4 py-3 rounded-lg">
					Desmarcar
				</button>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0" />
				<AlertDialog.Content className="fixed top-[40%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-50 p-[25px] shadow focus:outline-none">
					<AlertDialog.Title className="m-0 text-[17px] font-medium">
						Desmarcar Reunião
					</AlertDialog.Title>
					<AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
						Você realmente deseja se desmarcar nessa reunião?
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
								Desmarcar
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default ButtonDisconfirm;
