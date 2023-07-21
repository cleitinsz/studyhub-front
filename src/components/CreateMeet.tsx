import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { api } from '../lib/axios';
import { IMeet } from '../types/Meet';
import { AuthContext, useAuth } from '../context/AuthContext';

const schema = z.object({
	subject: z.string().nonempty('A matéria é obrigatória').max(50, {
		message: 'O nome da matéria deve conter no máximo 50 caracteres',
	}),
	place: z
		.string()
		.nonempty('O local é obrigatório')
		.max(200, { message: 'O local deve conter no máximo 200 caracteres' }),
	description: z
		.string()
		.nonempty()
		.max(350, { message: 'A descrição deve conter no máximo 100 caracteres' }),
	date_hour: z.string().refine(
		(value) => {
			const currentDate = dayjs();
			const selectedDate = dayjs(value, 'yyyy-MM-DDTHH:mm');
			return selectedDate.isValid() && selectedDate.isAfter(currentDate);
		},
		{
			message: 'A data deve ser posterior ao dia atual',
		}
	),
	num_persons: z.coerce.number().nonnegative(),
});

const CreateMeet = () => {
	const { user, isAuthenticated } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const isAuth = () => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMeet>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<IMeet> = async (data: IMeet) => {
		try {
			setLoading(true);
			await api.post('meetings/create', data);
			alert('Reunião criada!');
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button
					className="h-[40px] w-32 bg-white font-medium px-3 rounded-md"
					onClick={() => isAuth()}
				>
					Criar Reunião
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="" />
				<Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-2xl focus:outline-none">
					<Dialog.Title className="m-0 mb-4 text-[17px] font-medium">
						Criar Reunião
					</Dialog.Title>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="w-[90px] text-right text-[15px]"
							htmlFor="materia"
						>
							Matéria
						</label>
						<input
							className=" inline-flex h-[35px] outline-none focus:shadow-[0_0_0_2px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] shadow-[0_0_0_1px]"
							id=" materia"
							defaultValue=""
							type="text"
							{...register('subject')}
						/>
						{errors.subject && (
							<span className="text-sm text-red-600">
								{errors.subject.message}
							</span>
						)}
					</fieldset>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="local"
						>
							Local
						</label>
						<input
							className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
							id="local"
							defaultValue=""
							{...register('place')}
						/>
						{errors.place && (
							<span className="text-sm text-red-600">
								{errors.place.message}
							</span>
						)}
					</fieldset>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="Data"
						>
							Data
						</label>
						<input
							className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[5px] text-[12px] sm:text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
							id="local"
							defaultValue=""
							type="datetime-local"
							{...register('date_hour')}
						/>
						{errors.date_hour && (
							<span className="text-sm text-red-600">
								{errors.date_hour.message}
							</span>
						)}
					</fieldset>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="descricao"
						>
							Descrição
						</label>
						<textarea
							className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[70px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] py-2"
							{...register('description')}
						>
							{errors.description && (
								<span className="text-sm text-red-600">
									{errors.description.message}
								</span>
							)}
						</textarea>
					</fieldset>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="num_persons"
						>
							Nº Pessoas
						</label>
						<input
							className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
							id="num_persons"
							defaultValue=""
							type="number"
							{...register('num_persons')}
						/>
						{errors.num_persons && (
							<span className="text-sm text-red-600">
								{errors.num_persons.message}
							</span>
						)}
					</fieldset>
					<div className="mt-[25px] flex justify-end">
						<Dialog.Close asChild>
							<button
								className="font-medium border-2 border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white"
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={handleSubmit(onSubmit)}
							>
								Criar
							</button>
						</Dialog.Close>
					</div>
					<Dialog.Close asChild>
						<button
							className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
							aria-label="Close"
							disabled={loading}
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
export default CreateMeet;
