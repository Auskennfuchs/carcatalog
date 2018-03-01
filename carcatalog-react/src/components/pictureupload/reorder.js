import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import CarPicture from './carpicture'

const SortableItem = SortableElement(({ value, onDelete }) =>
    <li><CarPicture picId={value} onDelete={onDelete} /></li>
)

const SortableList = SortableContainer(({ items, onDelete }) =>
    <ul className="reorder">
        {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} onDelete={onDelete} />
        ))}
    </ul>
)

class ReOrder extends Component {

    static propTypes = {
        onDelete: PropTypes.func.isRequired,
        pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    constructor(props) {
        super(props)
        this.picRefs = []
        this.state = {
            pictures: props.pictures,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pictures: nextProps.pictures })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            pictures: arrayMove(this.state.pictures, oldIndex, newIndex),
        })
    }

    render() {
        const { pictures } = this.state
        return (
            <SortableList items={pictures} onSortEnd={this.onSortEnd} axis="xy" helperClass="placeholder" onDelete={this.props.onDelete}
                lockToContainerEdges transitionDuration={0}/>
        )
    }
}

export default ReOrder