import { useState } from 'react';
import { IInput } from '../../types/Input';
import useDebounce from './useDebounce';
import { MagnifyingGlass } from '@phosphor-icons/react';
import CreateMeet from '../CreateMeet';

const delay = 250;

const Input = ({ value, setSearch, hasFilter }: IInput) => {
	const [input, setInput] = useState('');

	const debouncedChange = useDebounce(setSearch, delay);

	const handleChange = (e: string) => {
		setInput(e);
		debouncedChange(e);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
			<div className="hidden xl:block" />
			<div className="w-full col-span-2 xl:col-span-1 px-7 sm:px-4 relative">
				<input
					value={input}
					onChange={(e) => handleChange(e.target.value)}
					type="text"
					placeholder="Ex.: Banco de Dados..."
					className="px-4 py-3 rounded-full w-full outline-none caret-gray-700"
				/>
				<MagnifyingGlass
					size={24}
					weight="regular"
					className="absolute top-3 right-10 sm:right-8 text-slate-400"
				/>
			</div>
			{hasFilter ? (
				<div className="flex justify-start sm:justify-end px-7 sm:px-0">
					<select
						defaultValue={'Filtrar'}
						onChange={(e) => setSearch(e.target.value)}
						className="px-2 py-3 h-full w-32 rounded-lg bg-white"
					>
						<option value="Filtrar" disabled>
							Filtrar...
						</option>
						<option value="1">1º Semestre</option>
						<option value="2">2º Semestre</option>
						<option value="3">3º Semestre</option>
						<option value="4">4º Semestre</option>
						<option value="5">5º Semestre</option>
						<option value="6">6º Semestre</option>
					</select>
				</div>
			) : (
				<div className="flex flex-start px-7 sm:px-0 sm:justify-end">
					<CreateMeet />
				</div>
			)}
		</div>
	);
};

export default Input;
