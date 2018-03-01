import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Carousel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numPics: this.props.pictures.length,
            currentPic: 0
        }
    }

    componentDidMount() {
        this.rotatePic()
    }

    rotatePic = () => {
        const { numPics } = this.state
        let { currentPic } = this.state
        currentPic += 1;
        if (currentPic >= numPics) {
            currentPic = 0;
        }
        this.setState({ currentPic })
        setTimeout(() => { this.rotatePic() }, 200)
    }

    render() {
        const { pictures } = this.props
        const { currentPic } = this.state
        return (
            <ul className="carousel">
                {pictures.map((pic, index) => (
                    <li key={pic.concat(index)} style={{
                        display: index === currentPic ? "inline-block" : "none"
                    }} >
                        <img src={process.env.REACT_APP_URL_PICTUREAPI.concat("/picture/").concat(pic)} alt="no pic" />
                    </li>
                ))
                }
            </ul>
        )
    }
}

Carousel.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Carousel