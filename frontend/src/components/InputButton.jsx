import React from 'react';
import PropTypes from 'prop-types'

const InputButton = (props) => {
    const { buttonLabel } = props;

    return (
        <input type="submit" value={buttonLabel} />
    );
};

InputButton.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default InputButton;
