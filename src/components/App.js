import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

import Base from '../base';

import sampleFishes from '../sample-fishes';

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object,
    }

    componentDidMount() {
        const { params } = this.props.match;

        const localStorageRef = localStorage.getItem(params.storeId);

        if (localStorage) {
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }

        this.ref = Base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        Base.removeBinding(this.ref);
    }

    addFishes = (fish) => {
        console.log('INSIDE App.js');
        // 1. Create copy of state
        const fishes = { ...this.state.fishes };
        // 2. Makes changes in copy
        fishes[`fish${Date.now()}`] = fish;
        // 3. Make changes in State
        this.setState({
            fishes: fishes,
        })
    };

    loadFishes = (event) => {
        this.setState({
            fishes: sampleFishes
        });
    }

    updateFish = (key, updatedFish) => {
        // 1. Create copy of state
        const fishes = { ...this.state.fishes };
        // 2. Make changes in copy
        fishes[key] = updatedFish;
        // 3. Push changes in state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        // 1. Create copy of state
        const fishes = { ...this.state.fishes };
        // 2. Make changes in copy
        fishes[key] = null;
        // 3. Push changes in state
        this.setState({ fishes });
    }

    addToOrder = (key) => {
        // 1. Create copy of state
        const order = { ...this.state.order };
        // 2. Make changes in copy
        order[key] = order[key] + 1 || 1;
        // 3. Push changes in state
        this.setState({ order });
    }

    removeFromOrder = (key) => {
        // 1. Create copy of state
        const order = { ...this.state.order };
        // 2. Make changes in copy
        delete order[key];
        // 3. Push changes in state
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
                <Inventory
                    fishes={this.state.fishes}
                    addFishes={this.addFishes}
                    loadFishes={this.loadFishes}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId} />
            </div>
        );
    }
}

export default App;