import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useContext, useEffect, useState } from 'react';
import { loginContext } from '~/context/loginContext';

const cx = classNames.bind(styles);

function Home() {
    const [login, _] = useContext(loginContext);
    // useEffect(() => {
    //     if (login) return;
    //     window.location.href = '/auth';
    // }, [login]);

    const handleGenerate = () => {
        if (!login) {
            window.location.href = '/auth';
        }
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('start-btn')} onClick={handleGenerate}>
                Generate
            </button>
        </div>
    );
}

export default Home;
