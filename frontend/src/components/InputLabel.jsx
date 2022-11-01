/* eslint no-unused-vars: 1 */

import React from 'react';
import PropTypes from 'prop-types'

const InputForm = (props) => {
    const { title, inputProperties } = props;

    return (
        <label htmlFor="shorten">
            {title}
            <input
                id={inputProperties.id}
                placeholder={inputProperties.placeholder}
                value={inputProperties.value}
                onChange={inputProperties.onChange}
                type="text"
            />
        </label>
    );
};

InputForm.propTypes = {
    title: PropTypes.string.isRequired,
    inputProperties: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default InputForm;
