import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { TextInput } from '~/components/InputHaveCheck';
import ShowMenuOption from '../ShowMenuOption';

const cx = classNames.bind(styles);

function Table({ id, database, setDatabase, handleDeleteTable }) {
    const [openChooseOption, setOpenChooseOption] = useState(false);
    const [indexType, setIndexType] = useState(null);
    const handleAddProperty = () => {
        setDatabase((prev) => {
            const newData = { ...prev };
            newData.tables[id].props.name.push('');
            newData.tables[id].props.type.push('firstName');
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
            const primaryKey = newData.tables[id].props.primaryKey;
            if (index < primaryKey) {
                newData.tables[id].props.primaryKey -= 1;
            } else if (index === primaryKey) {
                newData.tables[id].props.primaryKey = 0;
            }
            return newData;
        });
    };

    const handleChooseType = (index) => {
        setIndexType(index);
        setOpenChooseOption(true);
    };

    const handleSetPrimaryKey = (index) => {
        setDatabase((prev) => {
            const newData = { ...prev };
            newData.tables[id].props.primaryKey = index;
            return newData;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <ShowMenuOption
                id={id}
                indexType={indexType}
                setDatabase={setDatabase}
                open={openChooseOption}
                setOpen={() => setOpenChooseOption(false)}
            />
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
                            <input
                                type="radio"
                                name=""
                                className={cx('choose-primary-key')}
                                checked={index === database.tables[id].props.primaryKey}
                                onChange={() => handleSetPrimaryKey(index)}
                            />
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
                            <div className={cx('property-inp')}>
                                <TextInput
                                    isNotSelect={true}
                                    className={cx('property-type')}
                                    value={database.tables[id].props.type[index]}
                                    onClick={() => handleChooseType(index)}
                                />
                            </div>
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

Table.propTypes = {
    id: PropTypes.number,
    database: PropTypes.object,
    setDatabase: PropTypes.func,
    handleDeleteTable: PropTypes.func,
};

export default Table;
