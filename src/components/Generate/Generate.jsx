import { useState } from 'react';
import { faker } from '@faker-js/faker';
import classNames from 'classnames/bind';
import styles from './Generate.module.scss';

const cx = classNames.bind(styles);

function Generate() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [intVal, setIntVal] = useState('');
    const [floatVal, setFloatVal] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [datetime, setDatetime] = useState('');
    const [product, setProduct] = useState('');
    console.log(faker);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <label className={cx('label')}>FirstName</label>
                <div className={cx('value')}>{firstName}</div>
                <button className={cx('button')} onClick={() => setFirstName(faker.person.firstName())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>LastName</label>
                <div className={cx('value')}>{lastName}</div>
                <button className={cx('button')} onClick={() => setLastName(faker.person.lastName())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>FullName</label>
                <div className={cx('value')}>{fullName}</div>
                <button className={cx('button')} onClick={() => setFullName(faker.person.fullName())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>Gender</label>
                <div className={cx('value')}>{gender}</div>
                <button className={cx('button')} onClick={() => setGender(faker.person.sex())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>Int Value</label>
                <div className={cx('value')}>{intVal}</div>
                <button className={cx('button')} onClick={() => setIntVal(faker.number.int())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>Float Value</label>
                <div className={cx('value')}>{floatVal}</div>
                <button className={cx('button')} onClick={() => setFloatVal(faker.datatype.float())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>Phone</label>
                <div className={cx('value')}>{phone}</div>
                <button className={cx('button')} onClick={() => setPhone(faker.phone.imei())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>Id</label>
                <div className={cx('value')}>{id}</div>
                <button className={cx('button')} onClick={() => setId(faker.string.nanoid())}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>Datetime</label>
                <div className={cx('value')}>{datetime}</div>
                <button className={cx('button')} onClick={() => setDatetime(JSON.stringify(faker.date.anytime()))}>
                    Generate
                </button>
            </div>
            <div className={cx('container')}>
                <label className={cx('label')}>Product</label>
                <div className={cx('value')}>{product}</div>
                <button className={cx('button')} onClick={() => setProduct(faker.commerce.product())}>
                    Generate
                </button>
            </div>
        </div>
    );
}

export default Generate;
