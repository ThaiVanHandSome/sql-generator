import classNames from 'classnames/bind';
import styles from './InputHaveCheck.module.scss';

const cx = classNames.bind(styles);

const TextInput = ({ dbref, className, value, setValue, placeholder }) => {
    const classes = cx('text-input', {
        [className]: className,
    });

    const handleChangeInput = (e) => {
        const inpVal = e.target.value;
        if (setValue) {
            setValue(inpVal);
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
            ref={dbref}
            className={classes}
            type="text"
            value={value}
            onChange={(e) => handleChangeInput(e)}
            placeholder={placeholder}
        />
    );
};

export { TextInput };
