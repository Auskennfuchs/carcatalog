import React from 'react'
import {Dropdown} from 'semantic-ui-react'

const LabelSelect = ({ label = '', name, value='', options=[], onChange }) => (
    <div className="labelText">
        <span className="label">{label}</span>
        <Dropdown id={name} name={name} defaultValue={value} fluid selection options={options} onChange={onChange}/>
    </div>
)

export default LabelSelect