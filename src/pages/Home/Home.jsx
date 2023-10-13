import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { useContext, useEffect, useState } from 'react';
import { loginContext } from '~/context/loginContext';
import routes from '~/configs/routes';

const cx = classNames.bind(styles);

function Home() {
    const [login, _] = useContext(loginContext);
    // useEffect(() => {
    //     if (login) return;
    //     window.location.href = '/auth';
    // }, [login]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link className={cx('btn')} to={routes.generate}>
                    Generate SQL Statement
                </Link>
                <Link className={cx('btn')} to={routes.exceltosql}>
                    Convert Excel to SQL Statement
                </Link>
                {/* <button
                    className={cx('btn')}
                    onClick={() => {
                        window.location.href = routes.generate;
                    }}
                >
                    Generate SQL Statement
                </button> */}
                {/* <button
                    className={cx('btn')}
                    onClick={() => {
                        window.location.href = routes.exceltosql;
                    }}
                >
                    Convert Excel to SQL Statement
                </button> */}
                <button className={cx('btn')}>Convert JSON to SQL Statement</button>
            </div>
            <div className={cx('label-sql')}>SQL</div>
            <div className={cx('label-json')}>JSON</div>
            <div className={cx('label-excel')}>EXCEL</div>
        </div>
    );
}

export default Home;
