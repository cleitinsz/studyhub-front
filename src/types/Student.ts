export interface IStudent {
	_id: string;
	name: string;
	email: string;
	semester: number;
	course: {
		_id: string;
		name: string;
		unit: {
			_id: string;
			name: string;
		};
		_idHost: string;
	};
}
