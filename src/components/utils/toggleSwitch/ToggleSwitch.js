import React from 'react';
import './ToggleSwitch.css';

/**
 * @param value // boolean value to determine if the switch is on or off
 * @param onChange // function to handle the change event
 * @returns {JSX.Element}
 */
function ToggleSwitch({value, onChange}) {

    const handleChange = () => {
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
