/* eslint no-unused-vars: 1 */

import React from 'react';
import PropTypes from 'prop-types'

import InputLabel from "./InputLabel";
import InputButton from "./InputButton";

const UrlForm = (props) => {
    const { label, buttonLabel, onSubmit, inputProperties, useClass } = props;

    return (
        <form onSubmit={onSubmit} className={useClass}>
            <InputLabel title={label} inputProperties={inputProperties} />
            <InputButton buttonLabel={buttonLabel} />
            {/* TODO: show below only when the url has been shortened and copied */}
            <div>{/* Show shortened url --- copied! */}</div>
        </form>
    );
};

UrlForm.propTypes = {
    label: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    inputProperties: PropTypes.objectOf(PropTypes.any).isRequired,
    useClass: PropTypes.string.isRequired,
}

export default UrlForm;
