import React from 'react';
import classes from './MyInput.module.css';

const MyInput = (props) => {
    return (
        <div>
            <input {...props} className={classes.MyInput}/>
        </div>
    );
};

export default MyInput;