import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { connect } from 'react-redux'
import 'moment/locale/de'

class LabelDate extends Component {
    constructor(props) {
        super(props)
        Moment.locale('de')
        this.state = {
            dateValue: props.value !== null ? Moment(props.value).format("L") : ''
        }
    }

    onChangeValue = (e, target) => {
        this.setState({
            dateValue: target.value
        })
        try {
            target.value = Moment(target.value, "L").toISOString().toString()
        } catch (e) {
            target.value = ''
        }
        if (target.value === "Invalid date") {
            target.value = ''
        }
        this.props.onChange(e, target)
    }

    render() {
        const { label, name } = this.props
        const { dateValue } = this.state
        return (
            <div className="labelText">
                <span className="label">{label}</span>
                <Input id={name} name={name} value={dateValue || ''} fluid onChange={this.onChangeValue} type="text"
                    label={<Button icon="calendar" />} labelPosition="right" />
            </div>
        )
    }
}

LabelDate.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
}

LabelDate.defaultProps = {
    label: '',
    value: '',
    onChange: () => { },
}

const mapStateToProps = ({ value }) => ({ dateValue: value });

export default connect(null, mapStateToProps)(LabelDate)