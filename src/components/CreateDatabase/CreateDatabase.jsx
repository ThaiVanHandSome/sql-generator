import { useEffect, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import classNames from 'classnames/bind';
import styles from './CreateDatabase.module.scss';
import styles_inp from '../InputHaveCheck/InputHaveCheck.module.scss';
import Table from '../Table';
import { TextInput } from '../InputHaveCheck';

const cx = classNames.bind(styles);
const cx_inp = classNames.bind(styles_inp);
const dataType = {
    id: 'varchar(50)',
    firstName: 'varchar(50)',
    lastName: 'varchar(50)',
    fullName: 'varchar(50)',
    sex: 'varchar(50)',
    product: 'varchar(50)',
    phone: 'varchar(50)',
    int: 'int',
    float: 'float',
};
const generateData = {
    id: faker.string.nanoid,
    firstName: faker.person.firstName,
    lastName: faker.person.lastName,
    fullName: faker.person.fullName,
    sex: faker.person.sex,
    product: faker.commerce.product,
    phone: faker.phone.imei,
    int: faker.number.int,
    float: faker.datatype.float,
};
const database = {};

function CreateDatabase({ setSqlStatement }) {
    const [databaseName, setDatabaseName] = useState('');
    const [numberTable, setNumberTable] = useState([1]);

    const databaseNameRef = useRef();

    const checkValInp = (dom, val, check) => {
        val = val.trim();
        if (!val) {
            dom.classList.add(cx_inp('error'));
            return false;
        }
        return check;
    };

    const handleGenerate = () => {
        // table-name-inp
        // container-property
        // property-name-id-item
        // property-type-id-item
        var check = true;
        check = checkValInp(databaseNameRef.current, databaseName, check);
        database.name = databaseName;
        database.tables = [];
        for (var i = 0; i < numberTable.length; i++) {
            const tableData = {};
            const tableClass = `table-name-inp-${numberTable[i]}`;
            const listPropertyClass = `property-${numberTable[i]}`;
            const countClass = `count-${numberTable[i]}`;
            const table = document.querySelector(`.${tableClass}`);
            const count = document.querySelector(`.${countClass}`);
            check = checkValInp(table, table.value, check);
            tableData.name = table.value;
            tableData.props = {};
            tableData.props.name = [];
            tableData.props.type = [];
            tableData.cnt = parseInt(count.value);
            check = checkValInp(count, count.value, check);
            const listProp = document.querySelectorAll(`.${listPropertyClass}`);
            const arrProp = Array.from(listProp);
            for (var j = 0; j < arrProp.length; j++) {
                const namePropClass = `property-name-${numberTable[i]}-${j + 1}`;
                const typePropClass = `property-type-${numberTable[i]}-${j + 1}`;
                const nameProp = document.querySelector(`.${namePropClass}`);
                const typeProp = document.querySelector(`.${typePropClass}`);
                check = checkValInp(nameProp, nameProp.value, check);
                tableData.props.name.push(nameProp.value);
                tableData.props.type.push(typeProp.value);
            }
            database.tables.push(tableData);
        }
        if (check) {
            console.log(faker);
            console.log(database);
            handleCreateDatabase();
        } else {
            setSqlStatement('');
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
                declareTable += `${propNames[j]} ${dataType[propTypes[j]]}`;
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
                for (let k = 0; k < propTypes.length; k++) {
                    const val = generateData[propTypes[k]]();
                    if (dataType[propTypes[k]] === 'varchar(50)') {
                        vals += `'${val}'`;
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
        setNumberTable((prev) => {
            const newArr = [...prev];
            newArr.push(prev.length + 1);
            return newArr;
        });
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>CREATE DATABASE</h1>
            <div className={cx('database-info')}>
                <label className={cx('database-name-label')}>Database Name</label>
                <div className={cx('database-name-inp')}>
                    <TextInput
                        dbref={databaseNameRef}
                        value={databaseName}
                        setValue={setDatabaseName}
                        placeholder="Database name..."
                    />
                </div>
            </div>
            <div className={cx('create-table')}>
                {numberTable.map((items, index) => (
                    <Table id={items} />
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

export default CreateDatabase;
