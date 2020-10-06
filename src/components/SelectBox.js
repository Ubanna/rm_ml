import React, { useState } from "react";
import "../styles/SelectBox.css";
import { connect } from "react-redux";
import { getLocations } from "./redux/actions/userActions";
import PropTypes from "prop-types";

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: "",
      fullList: [],
      filteredArray: [],
      dropDown: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.fullList !== nextProps.user.locations) {
      return {
        fullList: nextProps.user.locations,
        filteredArray: nextProps.user.locations,
      };
    }

    return null;
  }

  controlBox = () => {
    this.setState((prevState) => ({
      dropDown: !prevState.dropDown,
    }));
  };

  closeControlBox = () => {
    this.setState((prevState) => ({
      dropDown: false,
    }));
    this.setState({
      filtered: "",
      filteredArray: this.state.fullList,
    });
  };

  handleChange = (event) => {
    return this.props.handleChange(event.target.value);
  };

  componentDidMount() {
    this.props.getLocations();
  }

  filterList = (e) => {
    const updatedList = this.state.fullList.filter((item) => {
      return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filteredArray: updatedList, filtered: e.target.value });
  };

  render() {
    const { dropDown, filteredArray, filtered } = this.state;
    const { selectedOption } = this.props;
    return (
      <div className="container">
        <div className="select-box">
          <div className={`options-container ${dropDown ? "active" : ""}`}>
            {filteredArray
              ? filteredArray.map((item) => (
                  <div
                    className="option"
                    key={item}
                    onClick={this.closeControlBox}
                  >
                    <label>
                      <input
                        type="radio"
                        className="radio"
                        id={item}
                        value={item}
                        name="category"
                        onChange={this.handleChange}
                      />
                      {item}
                    </label>
                  </div>
                ))
              : null}
          </div>
          <div className="selected" onClick={this.controlBox}>
            {selectedOption}
          </div>
          <div className="search-box">
            <input
              type="text"
              // onClick={this.handleChangeTwo}
              onChange={this.filterList}
              value={filtered}
              placeholder="Start typing...."
            />
          </div>
        </div>
      </div>
    );
  }
}

SelectBox.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  getLocations,
};

export default connect(mapStateToProps, mapActionsToProps)(SelectBox);
