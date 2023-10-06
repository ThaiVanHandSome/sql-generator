import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { FormLogin, FormSignUp } from '~/components/Form';
import Dialog from '~/components/Dialog';
import { loginContext } from '~/context/loginContext';

const cx = classNames.bind(styles);
// const login = JSON.parse(localStorage.getItem('login')) || false;

function Auth() {
    const [openLogin, setOpenLogin] = useState(true);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [_, setLogin] = useContext(loginContext);

    if (loginSuccess) {
        setLogin(true);
        window.location.href = '/generate';
    }

    return (
        <>
            {openDialog && <Dialog setOpen={setOpenDialog} />}
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('logo-container')}>
                        <div className={cx('logo')}>
                            <img
                                src={require('~/assets/images/img-01.webp')}
                                className={cx('logo')}
                                alt="computer-logo"
                            />
                        </div>
                    </div>
                    <div className={cx('form-container')}>
                        {openLogin && (
                            <FormLogin
                                setLoginSuccess={setLoginSuccess}
                                openLogin={openLogin}
                                setOpenLogin={setOpenLogin}
                                setOpenDialog={setOpenDialog}
                            />
                        )}
                        {!openLogin && (
                            <FormSignUp
                                setLoginSuccess={setLoginSuccess}
                                openLogin={openLogin}
                                setOpenLogin={setOpenLogin}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;
