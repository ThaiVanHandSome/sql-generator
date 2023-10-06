import routes from '~/configs/routes';

import Home from '~/pages/Home';
import Auth from '~/pages/Auth';
import Generate from '~/pages/Generate';

const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.auth,
        component: Auth,
    },
    {
        path: routes.generate,
        component: Generate,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
