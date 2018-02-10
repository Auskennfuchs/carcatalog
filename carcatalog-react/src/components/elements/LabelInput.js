import React from 'react'
import { Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const LabelInput = ({ label = '', name, value = '', onChange }) => (
    <div className="labelText">
        <span className="label">{label}</span>
        <Input id={name} name={name} value={value || ''} fluid onChange={onChange} />
    </div>
)

LabelInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
}

LabelInput.defaultProps = {
    label: '',
    value: '',
    onChange: () => {},
}

export default LabelInput