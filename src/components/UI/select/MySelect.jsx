import React from 'react';

const MySelect = ({options, defaultValue, onChange, value}) => {
    return (
        <div>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                <option disabled value=''>{defaultValue}</option>
                {
                    options.map(option =>
                        <option value={option.value} key={option.value}>{option.name}</option>
                    )
                }
            </select>
        </div>
    );
};

export default MySelect;