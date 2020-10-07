import React, { useEffect } from "react";
import "../App.css";
import { Button } from "./Button";
import "../styles/HeroSection.css";
import { connect } from "react-redux";
import SelectBox from "./SelectBox";
import { matchHouseTypes } from "./redux/actions/userActions";
import Loading from "./Loading";

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "Find a location",
    };
  }

  handleChange = (filterValue) => {
    this.setState({
      selectedOption: filterValue,
    });
  };

  get_house_types = (e) => {
    e.preventDefault();
    const { selectedOption } = this.state;
    if (selectedOption == "Find a location") {
      alert("Please select a valid location");
    } else {
      const formData = new FormData();
      formData.append(
        "area",
        selectedOption.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
      );
      this.props.matchHouseTypes(formData);
      return this.props.click();
    }
  };

  render() {
    return (
      <div className="hero-container" ref={this.props.reference}>
        <video src="/videos/video-2.mp4" autoPlay loop muted />
        <form className="centered">
          <h1>A home valuation tool for Nigerians</h1>
          <SelectBox
            selectedOption={this.state.selectedOption}
            handleChange={this.handleChange}
          />
          <div>
            <Button
              id="btnnn"
              className="btns"
              buttonStyle="btn--outlines"
              buttonSize="btn--large"
              onClick={this.get_house_types}
            >
              CONTINUE
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  matchHouseTypes,
};

export default connect(mapStateToProps, mapActionsToProps)(HeroSection);
