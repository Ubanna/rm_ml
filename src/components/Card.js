import React, { Component } from "react";
import "../styles/Card.css";
import { connect } from "react-redux";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";

class Cards extends Component {
  state = {
    price: "",
    homeDetails: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.price !== nextProps.user.estimatedPrice) {
      return {
        price: nextProps.user.estimatedPrice,
        homeDetails: nextProps.user.currentHomeDetails,
      };
    }

    return null;
  }

  render() {
    const { price, homeDetails } = this.state;
    const { types } = homeDetails;
    console.log(types);
    let homeTypes =
      types != undefined ? (
        <p className="p">{types.replace(/_/g, " ")}</p>
      ) : (
        <p className="p">{types}</p>
      );

    return (
      <div className="cards" ref={this.props.reference}>
        <section className="cardcontainer">
          <div id="div" className="left-half">
            <article>
              <div>
                <h1 className="h1">
                  <FaMapMarkerAlt size="0.8em" /> {homeDetails.area}
                </h1>
              </div>
              {homeTypes}
              <div
                className="beds"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <FaBed />
                  <p style={{ marginRight: 5 }}>{homeDetails.bedroom} beds</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <FaBath />
                  <p style={{ marginRight: 5 }}>{homeDetails.bathroom} baths</p>
                </div>
              </div>
            </article>
          </div>
          <div id="div" className="right-half">
            <article>
              <h1 className="h11">&#8358; {price.toLocaleString()}</h1>
            </article>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Cards);
