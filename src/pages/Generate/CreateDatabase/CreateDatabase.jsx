import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateDatabase.module.scss';
import styles_inp from '~/components/InputHaveCheck/InputHaveCheck.module.scss';
import Table from '../Table';
import { TextInput } from '~/components/InputHaveCheck';
import { generateFunc, DataType } from '~/components/DataOption';

const cx = classNames.bind(styles);
const cx_inp = classNames.bind(styles_inp);

const initDatabase = {
    name: '',
    tables: [
        {
            name: '',
            props: {
                name: [''],
                type: ['firstName'],
                primaryKey: 0,
            },
            cnt: 10,
        },
    ],
};

function CreateDatabase({ setSqlStatement }) {
    const [database, setDatabase] = useState(initDatabase);
    const [openMenu, setOpenMenu] = useState(false);

    const handleGenerate = () => {
        let check = true;
        let listInp = document.querySelectorAll(`.${cx_inp('text-input')}`);
        listInp = Array.from(listInp);
        console.log(listInp);
        listInp.forEach((item, index) => {
            const val = item.value.trim();
            if (!val) {
                item.classList.add(`${cx_inp('error')}`);
                check = false;
            }
        });
        if (check) {
            handleCreateDatabase();
        }
    };

    const handleCreateTable = () => {
        let sqlStatement = '';
        sqlStatement += `CREATE DATABASE ${database.name}\nGO\n\n`;
        sqlStatement += `USE ${database.name}\nGO\n\n`;
        const tablesData = database.tables;
        for (let i = 0; i < tablesData.length; i++) {
            sqlStatement += `CREATE TABLE ${tablesData[i].name}(\n`;
            const propNames = tablesData[i].props.name;
            const propTypes = tablesData[i].props.type;
            let declareTable = '';
            for (let j = 0; j < propNames.length; j++) {
                declareTable += `${propNames[j]} ${
                    DataType[propTypes[j]] === 'create' ? 'int' : DataType[propTypes[j]]
                }`;
                if (j === tablesData[i].props.primaryKey) {
                    declareTable += ' PRIMARY KEY';
                }
                if (j !== propNames.length - 1) {
                    declareTable += ',';
                }
                declareTable += '\n';
            }
            sqlStatement += declareTable;
            sqlStatement += ')\nGO\n\n';
        }
        return sqlStatement;
    };

    const handleInsetData = () => {
        let sqlStatement = '';
        const tables = database.tables;
        for (let i = 0; i < tables.length; i++) {
            let nameOfTables = '';
            const propsName = tables[i].props.name;
            for (let k = 0; k < propsName.length; k++) {
                nameOfTables += propsName[k];
                if (k !== propsName.length - 1) nameOfTables += ',';
            }
            for (let j = 0; j < tables[i].cnt; j++) {
                const propTypes = tables[i].props.type;
                let vals = '';
                let val = j + 1;
                for (let k = 0; k < propTypes.length; k++) {
                    if (typeof generateFunc[propTypes[k]] === 'function') {
                        val = generateFunc[propTypes[k]]();
                    }
                    const type = DataType[propTypes[k]];
                    console.log(DataType[propTypes[k]]);
                    if (type.includes('varchar')) {
                        vals += `'${val}'`;
                    } else if (type === 'create') {
                        vals += val.toString();
                    } else {
                        vals += parseInt(val / 100000000);
                    }
                    if (k !== propTypes.length - 1) {
                        vals += ', ';
                    }
                }
                sqlStatement += `INSERT INTO ${tables[i].name}(${nameOfTables}) VALUES (${vals})\n`;
                if (j === tables[i].cnt - 1) {
                    sqlStatement += '\n';
                }
            }
        }
        return sqlStatement;
    };

    const handleCreateDatabase = () => {
        let sqlState = '';
        sqlState += handleCreateTable();
        sqlState += handleInsetData();
        setSqlStatement(sqlState);
    };

    const handleAddTable = () => {
        setDatabase((prev) => {
            const newData = { ...prev };
            const myObj = {
                name: '',
                props: {
                    name: [''],
                    type: ['firstName'],
                },
                cnt: 10,
            };
            newData.tables.push(myObj);
            return newData;
        });
    };

    const handleDeleteTable = (index) => {
        setDatabase((prev) => {
            const newData = { ...prev };
            newData.tables.splice(index, 1);
            return newData;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>CREATE DATABASE</h1>
            <div className={cx('database-info')}>
                <label className={cx('database-name-label')}>Database Name</label>
                <div className={cx('database-name-inp')}>
                    <TextInput
                        type="database"
                        setDatabase={setDatabase}
                        value={database.name}
                        placeholder="Database name..."
                    />
                </div>
            </div>
            <div className={cx('create-table')}>
                {database.tables.map((items, index) => (
                    <Table
                        id={index}
                        database={database}
                        setDatabase={setDatabase}
                        handleDeleteTable={() => handleDeleteTable(index)}
                    />
                ))}
            </div>
            <button className={cx('btn-add-table')} onClick={handleAddTable}>
                Add table
            </button>
            <div className={cx('btn-generate-container')}>
                <button className={cx('btn-generate')} onClick={handleGenerate}>
                    Generate
                </button>
            </div>
        </div>
    );
}

CreateDatabase.propTypes = {
    setSqlStatement: PropTypes.func.isRequired,
};

export default CreateDatabase;
