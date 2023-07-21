import { MagnifyingGlass } from '@phosphor-icons/react';

const SearchButton = () => {
	return (
		<div className="w-96 2xl:w-1/2 flex justify-start md:justify-end relative">
			<input
				type="search"
				className="px-4 py-3 rounded-full ml-0 sm:ml-8 w-full outline-none caret-gray-700"
				placeholder="ex.: Banco de Dados..."
			/>
			<MagnifyingGlass
				size={24}
				weight="regular"
				className="absolute top-3 right-5 text-slate-500"
			/>
		</div>
	);
};

export default SearchButton;
