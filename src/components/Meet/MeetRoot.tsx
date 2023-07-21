import { ReactNode } from 'react';

interface MeetRootProps {
	children: ReactNode;
}

const MeetRoot = ({ children }: MeetRootProps) => {
	return (
		<div className="bg-white w-full mx-auto rounded-xl flex flex-col justify-between gap-6 p-6">
			{children}
		</div>
	);
};

export default MeetRoot;
