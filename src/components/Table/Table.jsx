import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { TextInput } from '../InputHaveCheck';

const cx = classNames.bind(styles);

function Table({ id }) {
    const [tableName, setTableName] = useState('');
    const [fakeArr, setFakeArr] = useState([1]);
    const tableNameClass = `table-name-inp-${id}`;
    const containerPropertyClass = `container-property-${id}`;
    const propertyClass = `property-${id}`;
    const countClass = `count-${id}`;

    const handleAddProperty = () => {
        setFakeArr((prev) => {
            const newArr = [...prev];
            newArr.push(prev.length + 1);
            return newArr;
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('table-name-inp')}>
                <TextInput
                    value={tableName}
                    setValue={setTableName}
                    placeholder="Table name..."
                    className={tableNameClass}
                />
            </div>
            <div
                className={cx({
                    'container-property': true,
                    [containerPropertyClass]: true,
                })}
            >
                {fakeArr.map((items, index) => {
                    const propertyNameClass = `property-name-${id}-${items}`;
                    const propertyTypeClass = `property-type-${id}-${items}`;
                    return (
                        <div
                            key={index}
                            className={cx({
                                property: true,
                                [propertyClass]: true,
                            })}
                        >
                            <div className={cx('property-inp')}>
                                <TextInput className={propertyNameClass} placeholder="Property name..." />
                            </div>
                            <select
                                className={cx({
                                    'property-type': true,
                                    [propertyTypeClass]: true,
                                })}
                            >
                                <option value="firstName">firstName</option>
                                <option value="lastName">lastName</option>
                                <option value="fullName">fullName</option>
                                <option value="sex">sex</option>
                                <option value="int">int</option>
                                <option value="float">float</option>
                                <option value="phone">phone</option>
                                <option value="id">id</option>
                                <option value="product">product</option>
                            </select>
                        </div>
                    );
                })}
            </div>
            <button className={cx('btn-add')} onClick={handleAddProperty}>
                Add property
            </button>
            <div className={cx('count')}>
                <TextInput className={countClass} placeholder="10..." />
            </div>
        </div>
    );
}

export default Table;
