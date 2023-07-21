import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyMeetings from '../pages/MyMeetings';
import ScheduledMeetings from '../pages/ScheduledMeetings';
import SignUp from '../pages/SignUp';

const MainRoutes = () => {
	return useRoutes([
		{ path: '/', element: <Home /> },
		{
			path: '/scheduledmeetings',
			element: <ScheduledMeetings />,
		},
		{ path: '/mymeetings', element: <MyMeetings /> },
		{ path: '/login', element: <Login /> },
		{ path: '/signup', element: <SignUp /> },
	]);
};

export default MainRoutes;
