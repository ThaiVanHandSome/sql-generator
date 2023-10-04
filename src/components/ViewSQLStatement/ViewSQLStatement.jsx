import { Fragment, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ViewSQLStatement.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const cx = classNames.bind(styles);

function ViewSQLStatement({ sqlStatement }) {
    const textRef = useRef(null);
    const textWithLineBreaks = sqlStatement.split('\n').map((line, index) => (
        <Fragment key={index}>
            {line}
            <br />
        </Fragment>
    ));
    const handleCopy = () => {
        if (textRef.current) {
            const textArea = document.createElement('textarea');
            textArea.value = textRef.current.innerText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <label className={cx('heading')}>SQL CODE</label>
            </div>
            <div className={cx('container-code')}>
                <p ref={textRef} className={cx('code')}>
                    {textWithLineBreaks}
                </p>
                <Tippy trigger="click" placement='bottom' content="copy success">
                    <button className={cx('btn-copy')} onClick={handleCopy}>
                        Copy
                    </button>
                </Tippy>
            </div>
        </div>
    );
}

export default ViewSQLStatement;
