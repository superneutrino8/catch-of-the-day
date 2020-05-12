import React, { Component } from 'react'
import PropTypes from 'prop-types';


export class EditFishForm extends Component {

    static propTypes = {
        updateFish: PropTypes.func,
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        index: PropTypes.string
    }

    handleChange = (event) => {
        console.log(event.currentTarget);

        // updtae the fish
        // 1. Take copy of existing fish and update it
        const fish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        }
        // 2. Call method for change
        this.props.updateFish(this.props.index, fish);

        console.log(fish);
    }

    render() {
        return (
            <div className="fish-edit">
                <input name="name" type="text" onChange={this.handleChange} value={this.props.fish.name} />
                <input
                    name="price"
                    type="text"
                    onChange={this.handleChange}
                    value={this.props.fish.price}
                />
                <select name="status" onChange={this.handleChange} value={this.props.fish.status} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
                <input
                    name="image"
                    type="text"
                    onChange={this.handleChange}
                    value={this.props.fish.image}
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div >
        )
    }
}

export default EditFishForm
