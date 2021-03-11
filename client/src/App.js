import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Products2 from "./pages/products";
import Posts from "./pages/posts";
import Dashboard from "./components/admin/dashboard";
import Home from "./pages/home";
import Cart from "./pages/cart";
import NavBar from "./components/common/navbar";
import ProductDetails from "./pages/productDetails";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleDelete = (id) => {
    const counters = this.state.counters.filter((counter) => counter.id !== id);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  render() {
    //Order routes from most specific routes to generic
    //render=(props) and {...props} passes history, match, and location props to components
    /*Optional path parameter are marked with question mark i.e. /posts/:year?/:month?
      It's better to use query string for optional parameters i.e. /posts?sortBy=newest
    */
    return (
      <div>
        <NavBar
          totalCounters={
            this.state.counters.filter((counter) => counter.value > 0).length
          }
        />
        <main className="container">
          <Switch>
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/products" component={Products2} />
            <Route path="/posts/:year?/:month?" component={Posts} />
            <Route path="/admin" component={Dashboard} />
            <Route
              path="/cart"
              render={(props) => (
                <Cart
                  counters={this.state.counters}
                  onReset={this.handleReset}
                  onIncrement={this.handleIncrement}
                  onDecrement={this.handleDecrement}
                  onDelete={this.handleDelete}
                  {...props}
                />
              )}
            />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
