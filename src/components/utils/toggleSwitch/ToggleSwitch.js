import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({value, onChange}) {

    const handleChange = (e) => {
        onChange(!value);
    }

    return (
        <div className='toggle-container' onClick={handleChange}>
            <input
                id='isOrdered'
                className='toggle'
                type="checkbox"
                checked={value}
                onChange={handleChange}
            />
            <span className='toggle-switch'></span>
        </div>
    );
}

export default ToggleSwitch;
