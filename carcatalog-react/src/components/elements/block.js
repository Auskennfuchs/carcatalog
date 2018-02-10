import React from 'react'
import { Grid } from 'semantic-ui-react'
import LabelInput from './LabelInput'
import LabelSelect from './LabelSelect'
import LabelDate from './LabelDate'
import LabelNumber from './LabelNumber'

function findField(fields, name) {
    return fields.find(f => f.field === name);
}

export const FieldColumn = ({ fieldName, fields, data, onChange }) => {
    const field = findField(fields, fieldName)
    if (!field) {
        return <Grid.Column />

    }
    const parts = fieldName.split('.')
    let value = data[parts[0]]
    parts.shift()
    parts.forEach(part => {
        if (value !== undefined) {
            value = value[part]
        }
    })
    let fieldType = "text"
    const options = []
    if (field.enumValues !== null) {
        fieldType = "select"
        field.enumValues.forEach(enumEntry => {
            options.push({
                value: enumEntry,
                text: enumEntry,
                key: enumEntry,
            })
        })    
        if (field.enumTexts !== null) {
            options.forEach((_, index) => {
                options[index].text = field.enumTexts[options[index].value] || options[index].text 
            })
        }
    }
    if (field.type === "Date") {
        fieldType = "date"
    }
    let fraction = 0
    let unit = null
    if (field.type === "Number") {
        fieldType = "number"
        fraction = 2
        if (!!field.unit) {
            unit = <span className="ui">{field.unit}</span>
        }
    }
    if (field.type === "Integer") {
        fieldType = "number"
        fraction = 0
        if (!!field.unit) {
            unit = <span className="ui">{field.unit}</span>
        }
    }
    return (
        <Grid.Column>
            {!!field && fieldType === "text" &&
                < LabelInput name={fieldName} value={value} label={field.label} onChange={onChange} />
            }
            {!!field && fieldType === "select" &&
                < LabelSelect name={fieldName} value={value} label={field.label} options={options} onChange={onChange} />
            }
            {!!field && fieldType === "date" &&
                < LabelDate name={fieldName} value={value} label={field.label} onChange={onChange} />
            }
            {!!field && fieldType === "number" &&
                < LabelNumber name={fieldName} value={value} label={field.label} onChange={onChange} fraction={fraction} unit={unit} />
            }
        </Grid.Column>
    )
}

export const ColumnRow = ({ groupFields, fields, data, onChange }) => (
    <Grid.Row>
        {!!groupFields && groupFields.map((field, index) => {
            if (typeof field === 'string') {
                return <FieldColumn fieldName={field} fields={fields} key={index} data={data} onChange={onChange} />
            }
            if (typeof field === 'object') {
                const res = field[Object.keys(field)[0]]
                const columns = res.length
                return <Grid.Column key={index}>
                    <Grid className="subGrid" columns={columns}>
                        <ColumnRow groupFields={res} data={data} fields={fields} onChange={onChange} />
                    </Grid>
                </Grid.Column>
            }
            return <div />
        })}
    </Grid.Row>
)

export const Block = ({ headerText = '', groupFields, fields, data = {}, onChange }) => {
    return (
        <Grid className="blockGrid" columns={2}>
            {headerText !== '' &&
                <Grid.Row className="headerRow">
                    <Grid.Column width={16}>
                        <span className="blockHeader">{headerText}</span>
                    </Grid.Column>
                </Grid.Row>
            }
            <ColumnRow data={data} fields={fields} groupFields={groupFields} onChange={onChange} />
        </Grid>
    )
}
