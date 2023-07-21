import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ISignUp } from '../types/Signup';
import { api } from '../lib/axios';
import { ICourse } from '../types/Course';

const schema = z
	.object({
		name: z
			.string()
			.nonempty('O nome é obrigatório')
			.max(100, { message: 'O nome deve conter no máximo 100 caracteres' }),
		email: z
			.string()
			.nonempty('O Email é obrigatório')
			.max(150, { message: 'O email deve conter no máximo 150 caracteres' })
			.email({ message: 'Email inválido' })
			.transform((email) => {
				return email.trim().toLowerCase();
			}),
		password: z
			.string()
			.min(8, {
				message: 'Senha inválida. A senha deve ter pelo menos 8 caracteres.',
			})
			.max(100, { message: 'A senha deve conter no máximo 100 caracteres' })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
			),
		confirmPassword: z.string(),
		semester: z.coerce
			.number()
			.gte(1, { message: 'O semestre precisa ser maior que 1' })
			.lte(6, { message: 'O semestre precisa ser menor ou igual a 6' }),
		idCourse: z.string(),
	})
	.refine((fields) => fields.password === fields.confirmPassword, {
		path: ['confirmPassword'],
		message: 'As senhas precisam ser idênticas',
	});

const SignUp = () => {
	const [course, setCourse] = useState<ICourse[]>([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUp>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<ISignUp> = async (data: ISignUp) => {
		const { name, email, password, semester, idCourse } = data;
		try {
			setLoading(true);
			await api.post('students/create', {
				name,
				email,
				password,
				semester,
				idCourse,
			});
			navigate('/login');
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getCourses = async () => {
		try {
			const response = await api.get('courses');
			const responseFormated = response.data.sort((a: any, b: any) =>
				a.name.localeCompare(b.name)
			);
			setCourse(responseFormated);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCourses();
	}, []);

	return (
		<form className="py-24 m-auto" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
				<div className="hidden lg:block lg:w-1/2 bg-cover">
					<img
						src="../../src/assets/imgSignup.jpeg"
						alt="teste"
						className="w-full h-full"
					/>
				</div>
				<div className="w-full p-8 lg:w-1/2">
					<h2 className="text-2xl font-semibold text-gray-700 text-center">
						StudyHub
					</h2>

					<div className="mt-4 flex items-center justify-between">
						<span className="border-b w-1/5 lg:w-1/4"></span>
						<a href="#" className="text-xs text-center text-gray-500 uppercase">
							Criar conta
						</a>
						<span className="border-b w-1/5 lg:w-1/4"></span>
					</div>
					<div className="mt-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Nome
						</label>
						<input
							className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
							type="text"
							{...register('name')}
						/>
						{errors.name && (
							<span className="text-sm text-red-600">
								{errors.name.message}
							</span>
						)}
					</div>
					<div className="mt-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email
						</label>
						<input
							className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
							type="email"
							{...register('email')}
						/>
						{errors.email && (
							<span className="text-sm text-red-600">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="mt-6">
						<div className="flex justify-between">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Senha
							</label>
						</div>
						<input
							className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
							type="password"
							{...register('password')}
						/>
						{errors.password && (
							<span className="text-sm text-red-600">
								{errors.password.message}
							</span>
						)}
					</div>
					<div className="mt-6">
						<div className="flex justify-between">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Confirmação de Senha
							</label>
						</div>
						<input
							className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
							type="password"
							{...register('confirmPassword')}
						/>
						{errors.confirmPassword && (
							<span className="text-sm text-red-600">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>
					<div className="grid grid-cols-4 gap-3">
						<div className="mt-4 flex-1">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Semestre
							</label>
							<input
								className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
								type="number"
								{...register('semester')}
							/>
							{errors.semester && (
								<span className="text-sm text-red-600">
									{errors.semester.message}
								</span>
							)}
						</div>
						<div className="mt-4 col-span-3">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Curso
							</label>
							<select
								className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-[10px] px-4 block w-full truncate"
								{...register('idCourse')}
							>
								{course.map((course, index) => {
									return (
										<option key={index} value={course._id}>
											{course.name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="mt-8">
						<button
							className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
							disabled={loading}
						>
							Criar conta
						</button>
					</div>
					<div className="mt-6 flex items-center justify-between">
						<span className="border-b w-1/5 md:w-1/4"></span>
						<Link to={'/login'} className="text-xs text-gray-500 uppercase">
							Ou fazer Login
						</Link>
						<span className="border-b w-1/5 md:w-1/4"></span>
					</div>
				</div>
			</div>
		</form>
	);
};

export default SignUp;
