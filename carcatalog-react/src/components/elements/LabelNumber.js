import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import 'moment/locale/de'

class LabelNumber extends Component {
    constructor(props) {
        super(props)
        const locale = 'de-DE'
        const formatter = Intl.NumberFormat(locale, { minimumFractionDigits: this.props.fraction, maximumFractionDigits: this.props.fraction })
        const thousandSeparator = Intl.NumberFormat(locale).format(1111).replace(/1/g, '')
        let decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/1/g, '')
        if (this.props.fraction === 0) {
            decimalSeparator = ' ';
        }
        this.state = {
            formatter,
            thousandSeparator,
            decimalSeparator,
            numberValue: props.value !== '' ? formatter.format(props.value) : ''
        }
    }

    componentWillUpdate(nextProps) {
        this.state.numberValue = nextProps.value !== '' ? this.state.formatter.format(nextProps.value) : ''
    }
   
    onChangeValue = (e, target) => {
        const targetValue = this.parseLocaleNumber(target.value)
        this.setState({
            numberValue: target.value
        })
        target.value = targetValue
        this.props.onChange(e, target)
    }

    onBlur = (e) => {
        const targetValue = this.parseLocaleNumber(this.state.numberValue)
        this.setState({ numberValue: this.state.formatter.format(targetValue) })
        e.target.value = targetValue
        this.props.onChange(e, e.target)
    }

    onKeyPress = (e) => {
        const keyCode = e.which || e.keyCode
        if ([46, 8, 9, 27, 13].find(code => keyCode === code) ||
            // Allow: Ctrl/cmd+A
            (keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl/cmd+C
            (keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl/cmd+X
            (keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
            (keyCode === this.state.thousandSeparator.charCodeAt(0) && !e.shiftKey) ||
            (keyCode === this.state.decimalSeparator.charCodeAt(0) && !e.shiftKey) ||
            // Allow: home, end, left, right
            (keyCode >= 35 && keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        if ((e.shiftKey || (keyCode < 48 || keyCode > 57)) /* && (keyCode < 96 || keyCode > 105) */) {
            e.preventDefault();
        }
    }

    parseLocaleNumber = (stringNumber) => {
        const { thousandSeparator, decimalSeparator } = this.state
        const parsedNumber = parseFloat(stringNumber
            .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
            .replace(new RegExp('\\' + decimalSeparator), '.')
        )

        if (isNaN(parsedNumber)) {
            return ''
        }
        return parsedNumber
    }

    render() {
        const { label, name, unit } = this.props
        const { numberValue } = this.state
        let labelPosition = null
        if (unit !== null) {
            labelPosition = "right"
        }
        return (
            <div className="labelText">
                <span className="label">{label}</span>
                <Input id={name} name={name} value={numberValue || ''} fluid onChange={this.onChangeValue} type="text"
                    onKeyPress={this.onKeyPress} onBlur={this.onBlur} label={unit} labelPosition={labelPosition} />
            </div>
        )
    }
}

LabelNumber.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    fraction: PropTypes.number,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    unit: PropTypes.node
}

LabelNumber.defaultProps = {
    label: null,
    value: '',
    fraction: 0,
    unit: null,
    onChange: () => { },
}

export default LabelNumber