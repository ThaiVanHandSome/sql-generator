import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './InputHaveCheck.module.scss';

const cx = classNames.bind(styles);

const TextInput = ({
    id,
    setData,
    indexProp,
    className,
    value,
    placeholder,
    setDatabase,
    type,
    isNotSelect,
    onClick,
}) => {
    const classes = cx('text-input', {
        'not-select': isNotSelect,
        [className]: className,
    });

    const handleChangeInput = (e) => {
        const inpVal = e.target.value;
        if (type === 'table') {
            setDatabase((prev) => {
                const newData = { ...prev };
                newData.tables[id].name = inpVal;
                return newData;
            });
        } else if (type === 'prop') {
            setDatabase((prev) => {
                const newData = { ...prev };
                newData.tables[id].props.name[indexProp] = inpVal;
                return newData;
            });
        } else if (type === 'database') {
            setDatabase((prev) => {
                const newData = { ...prev };
                newData.name = inpVal;
                return newData;
            });
        } else if (type === 'count') {
            setDatabase((prev) => {
                const newData = { ...prev };
                newData.tables[id].cnt = inpVal;
                return newData;
            });
        } else {
            setData(inpVal);
        }
        inpVal.trim();
        if (!inpVal) {
            if (e.target.classList.add(cx('error'))) e.target.classList.add(cx('error'));
        } else {
            if (e.target.classList.remove(cx('error'))) e.target.classList.remove(cx('error'));
        }
    };

    return (
        <input
            className={classes}
            type="text"
            value={value}
            onChange={(e) => handleChangeInput(e)}
            placeholder={placeholder}
            onClick={onClick}
            readOnly={isNotSelect}
        />
    );
};

export { TextInput };
