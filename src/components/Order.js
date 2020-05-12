import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { formatPrice } from "../helpers";

import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
    state = {}

    static propTypes = {
        removeFromOrder: PropTypes.func,
        order: PropTypes.object,
        fishes: PropTypes.object
    }

    renderOder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        };

        if (!fish) return null;

        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry {fish ? fish.name : 'fish'} is not available
                </li>
                </CSSTransition>);
        }
        else {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        <span>
                            <TransitionGroup component="span" className="count">
                                <CSSTransition
                                    classNames="count"
                                    key={count}
                                    timeout={{ enter: 500, exit: 500 }}
                                >
                                    <span>{count}</span>
                                </CSSTransition>
                            </TransitionGroup>
                    lbs {fish.name}
                            {formatPrice(count * fish.price)}
                            <button onClick={() => this.props.removeFromOrder(key)}>
                                &times;
                    </button>
                        </span>
                    </li>
                </CSSTransition>
            );
        }
    }

    render() {
        let orderIDs, total = 0;
        const size = this.props.order === null ? 0 : 1;
        if (size > 0) {
            orderIDs = Object.keys(this.props.order);
            total = orderIDs.reduce((prevTotal, key) => {
                const fish = this.props.fishes[key];
                const count = this.props.order[key];
                const isAvailable = fish && fish.status === 'available';
                if (isAvailable) {
                    return (prevTotal + (count * fish.price));
                }
                else {
                    return prevTotal;
                }
            }, 0);
        }
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {size === 0 ? '' : orderIDs.map(this.renderOder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;