import { useState } from 'react';
import CreateDatabase from './CreateDatabase';
import ViewSQLStatement from './ViewSQLStatement';
import classNames from 'classnames/bind';
import styles from './Generate.module.scss';

const cx = classNames.bind(styles);

function Generate() {
    const [sqlStatement, setSqlStatement] = useState('');
    return (
        <div className={cx('wrapper')}>
            <CreateDatabase setSqlStatement={setSqlStatement} />
            <ViewSQLStatement sqlStatement={sqlStatement} />
        </div>
    );
}

export default Generate;
