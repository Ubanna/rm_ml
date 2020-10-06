import React, { Component, createRef } from "react";
import "../../App.css";
import { connect } from "react-redux";
import Cards from "../Card";
import Features from "../Features";
import HeroSection from "../HeroSection";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCard: true,
    };
    this.scrollToDiv = (ref) => window.scrollTo(0, ref.current.offsetTop);
    this.el1 = createRef();
    this.el2 = createRef();
    this.el3 = createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.hideCard !== nextProps.user.hide_details) {
      return {
        hideCard: nextProps.user.hide_details,
      };
    }

    return null;
  }

  render() {
    const { hideCard } = this.state;
    let card = !hideCard ? <Cards reference={this.el3} /> : null;
    return (
      <div>
        <HeroSection
          reference={this.el1}
          click={() => this.scrollToDiv(this.el2)}
        />
        <Features
          reference={this.el2}
          click2={() => this.scrollToDiv(this.el3)}
        />
        {card}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
