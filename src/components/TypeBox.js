import React, { useState } from "react";
import "../styles/TypeBox.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TypeBox extends React.Component {
  state = {
    data: [],
    dropDown: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.user.homeTypes) {
      return {
        data: nextProps.user.homeTypes,
      };
    }

    return null;
  }

  handleChange = (event) => {
    return this.props.handleChange(event.target.value);
  };

  controlBox = () => {
    this.setState((prevState) => ({
      dropDown: !prevState.dropDown,
    }));
  };

  closeControlBox = () => {
    this.setState((prevState) => ({
      dropDown: false,
    }));
  };

  render() {
    const MAX_LENGTH = 17;
    const { typeOption } = this.props;
    const { dropDown, data } = this.state;
    return (
      <div className="container">
        <div className="type-box">
          <div className={`options-container ${dropDown ? "active" : ""}`}>
            {data.map((item) => (
              <div className="option" key={item} onClick={this.closeControlBox}>
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
            ))}
          </div>
          {typeOption.length > MAX_LENGTH ? (
            <div className="type_selected" onClick={this.controlBox}>
              {`${typeOption.substring(0, MAX_LENGTH)}...`}
            </div>
          ) : (
            <div className="type_selected" onClick={this.controlBox}>
              {typeOption}
            </div>
          )}
        </div>
      </div>
    );
  }
}

TypeBox.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(TypeBox);
