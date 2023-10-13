import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { MenuOption } from '~/components/DataOption';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import styles from './ShowMenuOption.module.scss';

const cx = classNames.bind(styles);

function ShowMenuOption({ id, indexType, setDatabase, open, setOpen }) {
    const [optionIndexSelected, setOptionIndexSelected] = useState(0);
    const [optionValueSelected, setOptionValueSelected] = useState(0);
    const handleSetOptionIndex = (index) => {
        setOptionIndexSelected(index);
        setOptionValueSelected(0);
    };
    const handleChoose = () => {
        if (setDatabase) {
            setDatabase((prev) => {
                const newData = { ...prev };
                newData.tables[id].props.type[indexType] = MenuOption[optionIndexSelected].options[optionValueSelected];
                console.log(newData);
                return newData;
            });
        }
        setOpen();
    };
    return (
        <div className={cx('wrapper')}>
            <Modal centered isOpen={open} toggle={setOpen} className={cx('container')}>
                <ModalHeader toggle={setOpen}>Choose Your Option</ModalHeader>
                <ModalBody>
                    <div className={cx('body')}>
                        <div className={cx('list-option')}>
                            {MenuOption.map((item, index) => (
                                <div
                                    className={cx('option-item', {
                                        active: index === optionIndexSelected,
                                    })}
                                    onClick={() => handleSetOptionIndex(index)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <div className={cx('list-option-value')}>
                            {MenuOption[optionIndexSelected].options.map((item, index) => (
                                <div
                                    className={cx('option-value', {
                                        active: optionValueSelected === index,
                                    })}
                                    onClick={() => setOptionValueSelected(index)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button size="lg" color="primary" onClick={handleChoose}>
                        Choose
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

ShowMenuOption.propTypes = {
    id: PropTypes.number.isRequired,
    indexType: PropTypes.number.isRequired,
    setDatabase: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default ShowMenuOption;
