import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const loginContext = createContext();

function LoginProvider({ children }) {
    const [login, setLogin] = useState(false);
    return <loginContext.Provider value={[login, setLogin]}>{children}</loginContext.Provider>;
}

LoginProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { loginContext };
export default LoginProvider;
