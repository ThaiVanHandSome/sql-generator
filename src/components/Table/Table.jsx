import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { TextInput } from '../InputHaveCheck';

const cx = classNames.bind(styles);

function Table({ id, database, setDatabase, handleDeleteTable }) {
    const handleAddProperty = () => {
        setDatabase((prev) => {
            const newData = { ...prev };
            newData.tables[id].props.name.push('');
            newData.tables[id].props.type.push('');
            return newData;
        });
    };

    const handleChangeSelection = (e, index) => {
        const inpVal = e.target.value;
        setDatabase((prev) => {
            const newData = { ...prev };
            newData.tables[id].props.type[index] = inpVal;
            return newData;
        });
    };

    const handleDeleteProp = (index) => {
        setDatabase((prev) => {
            const newData = { ...prev };
            newData.tables[id].props.name.splice(index, 1);
            newData.tables[id].props.type.splice(index, 1);
            return newData;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('table-name-inp')}>
                <TextInput
                    id={id}
                    value={database.tables[id].name}
                    setDatabase={setDatabase}
                    type="table"
                    placeholder="Table name..."
                />
            </div>
            <div className={cx('container-property')}>
                {database.tables[id].props.name.map((items, index) => {
                    return (
                        <div key={index} className={cx('property')}>
                            <div className={cx('property-inp')}>
                                <TextInput
                                    id={id}
                                    indexProp={index}
                                    value={database.tables[id].props.name[index]}
                                    setDatabase={setDatabase}
                                    type="prop"
                                    placeholder="Property name..."
                                />
                            </div>
                            <select
                                className={cx('property-type')}
                                value={database.tables[id].props.type[index]}
                                onChange={(e) => handleChangeSelection(e, index)}
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
                            <div className={cx('btn-delete-prop')} onClick={() => handleDeleteProp(index)}>
                                X
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className={cx('btn-add')} onClick={handleAddProperty}>
                Add property
            </button>
            <button className={cx('btn-delete')} onClick={handleDeleteTable}>
                Delete
            </button>
            <div className={cx('count')}>
                <TextInput
                    value={database.tables[id].cnt}
                    id={id}
                    setDatabase={setDatabase}
                    type="count"
                    placeholder="10..."
                />
            </div>
        </div>
    );
}

export default Table;
