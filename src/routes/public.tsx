import HomePage from "../pages/Home";
import UserPage from "../pages/User";
import { UserProvider } from "../providers/user.provider";

const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/user-lookup',
        element: <UserProvider><UserPage /></UserProvider>,
    },
    {
        path: '/user-lookup/:id',
        element: <UserProvider><UserPage /></UserProvider>,
    },
];

export default routes;