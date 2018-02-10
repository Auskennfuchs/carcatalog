import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Calendar extends Component {

    constructor(props) {
        super(props)
        let currentDate = new Date()
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear()
        const firstDay = new Date(year, month, 1)
        console.log(firstDay)
        let dayOfWeek = firstDay.getDay()
        console.log(dayOfWeek)
        dayOfWeek = (dayOfWeek === 0) ? 7 : dayOfWeek

        let startDate = firstDay
        startDate.setDate(firstDay.getDate() - dayOfWeek + 1)
        console.log(startDate)
        this.state = {
            days: this.calcDaysArray(startDate)
        }
    }

    calcDaysArray = (firstDate) => {
        let days = []
        for (let rows = 0; rows < 5; rows += 1) {
            days[rows] = []
            for (let i = 0; i < 7; i += 1) {
                days[rows].push(firstDate.getDate())
                firstDate.setDate(firstDate.getDate() + 1)
            }
        }
        return days
    }

    render() {
        const { days } = this.state
        return (
            <div className="calendar">
                <div className="navContainer">
                    <Button icon="triangle left"/>
                    <Button icon="triangle right"/>
                </div>
                <div className="dayContainer">
                        {days.map((week, index) =>
                            <div className="week" key={"week".concat(index)}>
                                {week.map((day, indexd) =>
                                    <div className="day" key={"calday_".concat(indexd)}>
                                        <span>{day}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                )
            }
        }
        
export default Calendar