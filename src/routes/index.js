import routes from '~/configs/routes';

import Home from '~/pages/Home';
import Auth from '~/pages/Auth';
import Generate from '~/pages/Generate';
import ExcelToSQL from '~/pages/ExcelToSQL';

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
    {
        path: routes.exceltosql,
        component: ExcelToSQL,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
