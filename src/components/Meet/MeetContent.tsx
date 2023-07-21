import { User } from '@phosphor-icons/react';
import { IMeet } from '../../types/Meet';
import dayjs from 'dayjs';

const MeetContent = (meet: IMeet) => {
	const date = meet.date_hour;
	const dateFormated = dayjs(date).format('DD/MM');
	const hourFormated = dayjs(date).format('HH:mm');

	return (
		<div className="bg-white rounded-xl flex flex-col justify-between gap-8 w-full">
			<div className="grid grid-cols-4 items-center justify-between ">
				<div className="flex col-span-3 gap-4">
					<div className="bg-slate-200 rounded-xl w-11 h-11 grid place-content-center">
						<User size={24} className="text-slate-700 " />
					</div>
					<div className="flex flex-col">
						<span className="font-medium capitalize">{meet.host.name}</span>
						<span className="text-slate-600 text-sm">
							{dateFormated} - {hourFormated}
						</span>
					</div>
				</div>
				<div className="flex justify-end text-sm md:text-base">
					{meet.status === 'Em aberto' ? (
						<span className="bg-green-200 text-sm py-3 px-3 rounded-full text-green-700">
							Em aberto
						</span>
					) : meet.status === 'Concluída' ? (
						<span className="bg-blue-200 text-sm py-3 px-3 rounded-full text-blue-700">
							Concluída
						</span>
					) : (
						<span className="bg-red-200 text-sm py-3 px-3 rounded-full text-red-700">
							Cancelada
						</span>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-2 ">
				<span className="text-base md:text-lg">
					{meet.subject} -{' '}
					<span className="text-base ">{meet.host.semester}º Semestre</span>
				</span>
				<span className="text-slate-600 text-sm">{meet.description}</span>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-start gap-4">
					<p className="text-base font-medium w-1/2">
						Local: <span className="font-normal">{meet.place}</span>
					</p>

					<span className="text-lg">|</span>
					<p className="font-medium text-sm md:text-base w-1/2">
						Pessoas Inscritas:
						<span className="font-normal"> {meet.num_persons}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default MeetContent;
