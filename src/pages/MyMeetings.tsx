import { useEffect, useState } from 'react';
import CreateMeet from '../components/CreateMeet';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import { IMeet } from '../types/Meet';
import { api } from '../lib/axios';
import { Meet } from '../components/Meet';
import Input from '../components/Input/Input';

const MyMeetings = () => {
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [meets, setMeets] = useState<IMeet[]>([]);

	const getAllMeets = async () => {
		try {
			setLoading(true);
			const response = await api.get('meetings/host');
			setMeets(response.data.meetings);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const lowerSearch = search.toLowerCase();
	const filteredMeets = meets.filter(
		(meet) =>
			meet.subject.toLowerCase().includes(lowerSearch) ||
			meet.host.semester.toString().includes(lowerSearch)
	);

	useEffect(() => {
		getAllMeets();
	}, []);

	return (
		<div className="h-screen xsm:h-full md:pb-4 w-screen bg-primary relative flex flex-col items-center">
			<Header />
			<div className="w-full sm:w-3/4">
				<Input value={search} setSearch={setSearch} />
			</div>
			<main className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 sm:p-0 gap-12 mt-10 place-content-around sm:w-3/4 mx-auto px-6">
				{meets.length === 0 ? (
					<p className="text-white font-semibold">
						Você ainda não criou nenhuma reunião.
					</p>
				) : (
					filteredMeets.map((meet, index) => (
						<Meet.Root key={index}>
							<Meet.Content {...meet} />
							<Meet.ButtonCancel {...meet} />
						</Meet.Root>
					))
				)}
			</main>
		</div>
	);
};

export default MyMeetings;
