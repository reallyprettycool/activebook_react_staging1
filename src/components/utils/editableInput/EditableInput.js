import React, { Component } from 'react';
class EditableInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder || 'Click to edit',
            isEditing: false,
            editedValue: props.value,
            onSave: props.onSave
        };

    }

    handleDoubleClick = () => {
        this.setState({ isEditing: true });
    };

    handleChange = (e) => {
        this.setState({ editedValue: e.target.value });
    };

    handleBlur = () => {
        const { editedValue } = this.state;
        this.setState({ isEditing: false });
        console.log('edited');
        this.state.onSave(editedValue); // Call onSave function to save the edited value
    };

    style = {
    }

    render() {
        const { value } = this.props;

        return (
            <div
                className={'d-flex flex-row justify-content-center align-items-center'}
                onDoubleClick={this.handleDoubleClick}>
                {this.state.isEditing ? (
                    <input
                        className={'m-auto text-center text-nowrap w-100'}
                        style={this.style}
                        type="text"
                        placeholder={this.state.placeholder}
                        value={this.state.editedValue}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        autoFocus
                    />
                ) : (
                    //if the input has not been changed text-muted
                    <p  className={'m-auto ' + (this.state.editedValue === ''? 'text-muted' : '')}
                        style={this.style}>
                        {value || this.state.placeholder}
                    </p>
                )}
            </div>
        );
    }
}

export default EditableInput;
