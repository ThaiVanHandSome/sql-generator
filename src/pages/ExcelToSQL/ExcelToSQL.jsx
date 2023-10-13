import classNames from 'classnames/bind';
import styles from './ExcelToSQL.module.scss';
import styles_inp from '~/components/InputHaveCheck/InputHaveCheck.module.scss';
import ViewSQLStatement from '../Generate/ViewSQLStatement';
import { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import ShowTableProperty from './ShowTableProperty';

const cx = classNames.bind(styles);
const cx_inp = classNames.bind(styles_inp);
const dataType = {};

function ExcelToSQL() {
    const [sqlStatement, setSqlStatement] = useState('');
    const [data, setData] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [tableName, setTableName] = useState('');
    function isVietnameseString(inputString) {
        const vietnameseRegex =
            /^[a-zA-ZÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶàáảãạâầấẩẫậăằắẳẵặđĐêềếểễệÊỀẾỂỄỆìíỉĩịÌÍỈĨỊòóỏõọôồốổỗộơờớởỡợÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢùúủũụưừứửữựÙÚỦŨỤƯỪỨỬỮỰỳýỷỹỵỲÝỶỸỴ]+$/;
        return vietnameseRegex.test(inputString);
    }

    function isDate(value) {
        // Sử dụng biểu thức chính quy để kiểm tra xem giá trị có phải là ngày tháng hay không
        const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/; // Ví dụ: DD/MM/YYYY
        return dateRegex.test(value);
    }

    const createSQLStatement = (fileUrl) => {
        const XLSX = require('xlsx');
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
            setData(jsonData);
        };

        reader.readAsArrayBuffer(fileUrl);
    };
    const handleChooseFile = (e) => {
        createSQLStatement(e.target.files[0]);
    };

    const handleCreateDatatype = () => {
        Object.keys(data[0]).forEach((item, index) => {
            const cls = `option-value-${index}`;
            const type = document.querySelector(`.${cls}`);
            dataType[item] = type.value;
        });
    };

    const handleGenerate = () => {
        if (!tableName) {
            const textInp = document.querySelector(`.${cx('text-inp')}`);
            if (!textInp.value) {
                textInp.classList.add(cx_inp('error'));
            }
            return;
        }
        handleCreateDatatype();
        let sqlState = '';
        let nameOfProps = '';
        Object.keys(data[0]).forEach((item) => {
            nameOfProps += item;
            nameOfProps += ',';
        });
        nameOfProps = nameOfProps.slice(0, -1);
        data.forEach((item, index) => {
            let sql = `INSERT INTO ${tableName}(${nameOfProps}) VALUES(`;
            Object.keys(item).forEach((prop, index) => {
                const type = dataType[prop];
                if (type.includes('nvarchar')) {
                    sql += `N'${item[prop]}'`;
                } else if (type.includes('char') || type.includes('date')) {
                    sql += `'${item[prop]}'`;
                } else {
                    sql += item[prop];
                }
                sql += ',';
            });
            sql = sql.slice(0, -1);
            sql += ')\n';
            sqlState += sql;
        });
        setSqlStatement(sqlState);
    };

    const toggle = () => setShowTable(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-left')}>
                <h1 className={cx('title')}>CHOOSE EXCEL FILE</h1>
                <div className={cx('inp-file')}>
                    <span>Choose Excel File</span>
                    <input
                        type="file"
                        name="excelfile"
                        className={cx('excel-file-inp')}
                        onChange={(e) => handleChooseFile(e)}
                        accept=".xlsx"
                    />
                </div>
                {!!data && (
                    <Modal isOpen={showTable} toggle={toggle} centered className={cx('show-table-modal')}>
                        <ModalHeader toggle={toggle}>Table</ModalHeader>
                        <ModalBody toggle={toggle}>
                            <div className={cx('show-table')}>
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            {Object.keys(data[0]).map((item, index) => (
                                                <th key={index}>{item}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr>
                                                {Object.values(item).map((val, idx) => (
                                                    <td key={idx}>{val}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </ModalBody>
                    </Modal>
                )}
                <button
                    className={cx('show-table-btn', {
                        disable: !data,
                    })}
                    onClick={() => setShowTable(true)}
                >
                    View Data Of Table
                </button>
                {!!data && <ShowTableProperty data={data} setTableName={setTableName} />}
                <button
                    className={cx('btn-generate', {
                        disable: !data,
                    })}
                    onClick={handleGenerate}
                >
                    Generate
                </button>
            </div>
            <div className={cx('container-right')}>
                <ViewSQLStatement sqlStatement={sqlStatement} />
            </div>
        </div>
    );
}

export default ExcelToSQL;
