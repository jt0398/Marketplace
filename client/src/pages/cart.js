import React, { Component } from "react";
import Counters from "../components/common/counters";

class Cart extends Component {
  render() {
    const {
      counters,
      onReset,
      onIncrement,
      onDelete,
      onDecrement,
    } = this.props;

    return (
      <main className="container">
        <Counters
          counters={counters}
          onReset={onReset}
          onIncrement={onIncrement}
          onDelete={onDelete}
          onDecrement={onDecrement}
        />
      </main>
    );
  }
}

export default Cart;
