import React from 'react'

const LabelText = ({ label = '', text = '' }) => (
    <div className="labelText">
        <span className="label">{label}</span>
        <span className="text">{text}</span>
    </div>
)

export default LabelText