import classNames from 'classnames/bind';
import styles from './ExcelToSQL.module.scss';
import { TextInput } from '~/components/InputHaveCheck';

const cx = classNames.bind(styles);

function ShowTableProperty({ data, setTableName }) {
    return (
        <div className={cx('table-properties')}>
            <h1>Table name</h1>
            <TextInput className={cx('text-inp')} placeholder="...tableName" setData={setTableName} />
            <h1>Properties</h1>
            <div className={cx('container-property')}>
                {Object.keys(data[0]).map((item, index) => {
                    const cls = `option-value-${index}`;
                    return (
                        <div key={index} className={cx('property')}>
                            <span>{item}</span>
                            <select className={cls}>
                                <option value="nvarchar(1000)">nvarchar</option>
                                <option value="varchar(1000)">varchar</option>
                                <option value="int">int</option>
                                <option value="float">float</option>
                                <option value="date">date</option>
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ShowTableProperty;
