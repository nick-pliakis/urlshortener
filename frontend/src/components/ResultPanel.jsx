/* eslint no-unused-vars: 1 */

import React from 'react';
import PropTypes from 'prop-types'

const ResultPanel = (props) => {
    const { visible, result } = props;

    const divStyle = visible ? {} : { display: "none" };

    return <div style={divStyle} className="result-margin-top">{result}</div>
}

ResultPanel.propTypes = {
    visible: PropTypes.bool.isRequired,
    result: PropTypes.string.isRequired,
}

export default ResultPanel;
