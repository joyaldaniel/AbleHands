import React from "react";
import "../../../styles/User/become-driver.css";
import { Container, Row, Col } from "reactstrap";
import driverImg from "../../../assets/all-images/cars-img/toyota-offer-2.png";
import { Link } from "react-router-dom";


const BecomeDriverSection = () => {
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>
            <Link to="/expert_login" className=" d-flex align-items-center gap-1 text-decoration-none">
            <button className="btn become__driver-btn mt-4">
              Become a Driver
            </button>
            </Link>


           


          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
