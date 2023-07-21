export interface IMeet {
	_id: string;
	subject: string;
	description: string;
	place: string;
	num_persons: number;
	date_hour: Date;
	status: 'Em aberto' | 'Concluída' | 'Cancelada';
	host: {
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
		};
	};
	_idHost: string;
	students: ['string'];
}
