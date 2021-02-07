import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset(this);
  }

  handleDelete(id) {
    const counters = this.state.counters.filter((counter) => counter.id !== id);
    this.setState({ counters });
  }

  handleReset() {
    const counters = this.state.counters.map((counter) => (counter.value = 0));
    this.setState({ counters });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleReset} className="btn-primary btn-sm mb-2">
          Reset
        </button>
        {this.state.counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
