import React, { Component } from 'react';

/**
 * This component is an editable input field
 * @param props - The props of the component
 * @returns {JSX.Element}
 */
class EditableInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder || 'Click to edit', // Set a default placeholder
            isEditing: false,           // Set the initial state of isEditing to false
            editedValue: props.value,   // Set the initial state of editedValue to the value prop
            onSave: props.onSave        // Set the initial state of onSave to the onSave prop
        };

    }

    // If the user double clicks on the input, set isEditing to true
    handleDoubleClick = () => {
        this.setState({ isEditing: true });
    };

    // If the user changes the input value, update the editedValue state
    handleChange = (e) => {
        this.setState({ editedValue: e.target.value });
    };

    // If the user clicks away from the input, set isEditing to false
    handleBlur = () => {
        const { editedValue } = this.state;
        this.setState({ isEditing: false });
        console.log('edited');
        this.state.onSave(editedValue); // Call onSave function to save the edited value
    };

    render() {
        const { value } = this.props;

        return (
            <div
                className={'d-flex flex-row justify-content-center align-items-center'}
                onDoubleClick={this.handleDoubleClick}>
                {this.state.isEditing ? (
                    <input
                        className={'m-auto text-center text-nowrap w-100'}
                        type="text"
                        placeholder={this.state.placeholder}
                        value={this.state.editedValue}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        autoFocus
                    />
                ) : (
                    //if the input has not been changed text-muted
                    <p  className={'m-auto ' + (this.state.editedValue === ''? 'text-muted' : '')}>
                        {value || this.state.placeholder}
                    </p>
                )}
            </div>
        );
    }
}

export default EditableInput;
