import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    return (
        <div>
            <button {...props} className={classes.MyBtn}>
                {children}
            </button>
        </div>
    );
};

export default MyButton;