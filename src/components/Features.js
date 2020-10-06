import React from "react";
import { Button } from "./Button";
import TypeBox from "./TypeBox";
import "../styles/Features.css";
import { connect } from "react-redux";
import { predictHomePrice } from "./redux/actions/userActions";
import ScrollDown from "./Scroll";
class Features extends React.Component {
  constructor() {
    super();

    this.state = {
      area: "",
      types: "",
      bedroom: "",
      bathroom: "",
      selectedOption: "4",
      bathOption: "4",
      typeOption: "Home Type",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.area !== nextProps.user.location) {
      return {
        area: nextProps.user.location,
      };
    }

    return null;
  }

  handleChange = (filterValue) => {
    this.setState({
      typeOption: filterValue,
    });
  };

  reset = (erase) => {
    this.setState({
      typeOption: erase,
    });
  };

  onRadioChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  onBathChange = (e) => {
    this.setState({
      bathOption: e.target.value,
    });
  };

  estimate_home_price = (e) => {
    e.preventDefault();
    const { selectedOption, bathOption, typeOption, area } = this.state;
    if (typeOption == "Home Type" || area == "") {
      alert("Please complete empty field");
    } else {
      const keyValuePair = [
        { key: "area", value: area },
        { key: "types", value: typeOption },
        { key: "bedroom", value: selectedOption },
        { key: "bathroom", value: bathOption },
      ];
      const formData = new FormData();
      keyValuePair.map((keyvalue) => {
        formData.append(keyvalue.key, keyvalue.value);
      });
      this.props.predictHomePrice(formData);
      setTimeout(() => {
        return this.props.click2();
      }, 1000);
    }
  };

  render() {
    return (
      <div className="features" ref={this.props.reference}>
        <div className="mini_container">
          <form className="form">
            <h2>Beds</h2>
            <div className="switch-field">
              <label
                style={{
                  backgroundColor:
                    this.state.selectedOption === "3" ? "#002e5d" : "",
                  color: this.state.selectedOption === "3" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="3"
                  id="3"
                  name="bedroom"
                  checked={this.state.selectedOption === "3"}
                  onChange={this.onRadioChange}
                />
                3
              </label>

              <label
                style={{
                  backgroundColor:
                    this.state.selectedOption === "4" ? "#002e5d" : "",
                  color: this.state.selectedOption === "4" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="4"
                  id="4"
                  name="bedroom"
                  checked={this.state.selectedOption === "4"}
                  onChange={this.onRadioChange}
                />
                4
              </label>
              <label
                style={{
                  backgroundColor:
                    this.state.selectedOption === "5" ? "#002e5d" : "",
                  color: this.state.selectedOption === "5" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="5"
                  id="5"
                  name="bedroom"
                  checked={this.state.selectedOption === "5"}
                  onChange={this.onRadioChange}
                />
                5
              </label>

              <label
                style={{
                  backgroundColor:
                    this.state.selectedOption === "6" ? "#002e5d" : "",
                  color: this.state.selectedOption === "6" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="6"
                  id="6"
                  name="bedroom"
                  checked={this.state.selectedOption === "6"}
                  onChange={this.onRadioChange}
                />
                6
              </label>

              <label
                style={{
                  backgroundColor:
                    this.state.selectedOption === "7" ? "#002e5d" : "",
                  color: this.state.selectedOption === "7" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="7"
                  id="7"
                  name="bedroom"
                  checked={this.state.selectedOption === "7"}
                  onChange={this.onRadioChange}
                />
                7
              </label>
            </div>
          </form>

          <form className="form">
            <h2>Bath</h2>
            <div className="switch-field">
              <label
                style={{
                  backgroundColor:
                    this.state.bathOption === "3" ? "#002e5d" : "",
                  color: this.state.bathOption === "3" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="3"
                  id="bath3"
                  name="bathroom"
                  checked={this.state.bathOption === "3"}
                  onChange={this.onBathChange}
                />
                3
              </label>

              <label
                style={{
                  backgroundColor:
                    this.state.bathOption === "4" ? "#002e5d" : "",
                  color: this.state.bathOption === "4" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="4"
                  id="bath4"
                  name="bathroom"
                  checked={this.state.bathOption === "4"}
                  onChange={this.onBathChange}
                />
                4
              </label>
              <label
                style={{
                  backgroundColor:
                    this.state.bathOption === "5" ? "#002e5d" : "",
                  color: this.state.bathOption === "5" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="5"
                  id="bath5"
                  name="bathroom"
                  checked={this.state.bathOption === "5"}
                  onChange={this.onBathChange}
                />
                5
              </label>

              <label
                style={{
                  backgroundColor:
                    this.state.bathOption === "6" ? "#002e5d" : "",
                  color: this.state.bathOption === "6" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="6"
                  id="bath6"
                  name="bathroom"
                  checked={this.state.bathOption === "6"}
                  onChange={this.onBathChange}
                />
                6
              </label>

              <label
                style={{
                  backgroundColor:
                    this.state.bathOption === "7" ? "#002e5d" : "",
                  color: this.state.bathOption === "7" ? "white" : "",
                }}
              >
                <input
                  type="radio"
                  value="7"
                  id="bath7"
                  name="bathroom"
                  checked={this.state.bathOption === "7"}
                  onChange={this.onBathChange}
                />
                7
              </label>
            </div>
          </form>

          <div className="type_form">
            <h2>Type</h2>
            <TypeBox
              typeOption={this.state.typeOption}
              handleChange={this.handleChange}
              reset={this.reset}
            />
          </div>
        </div>

        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={this.estimate_home_price}
        >
          ESTIMATE PRICE
        </Button>

        <ScrollDown />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  predictHomePrice,
};

export default connect(mapStateToProps, mapActionsToProps)(Features);
