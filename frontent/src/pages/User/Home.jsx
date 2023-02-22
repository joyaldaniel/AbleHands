import React, { useEffect, useState } from "react";
import Footer from "../../components/User/Footer/Footer"
import HeroSlider from "../../components/User/UI/HeroSlider";
import Helmet from "../../components/User/Helmet/Helmet";
import Header from "../../components/User/Header/Header";
import { Container, Row, Col } from "reactstrap";
import FindVolForm from "../../components/User/UI/FindVolForm";
import AboutSection from "../../components/User/UI/AboutSection";
import ServicesList from "../../components/User/UI/ServicesList";
// import volData from "../../assets/data/volData";
import CarItem from "../../components/User/UI/CarItem";
import BecomeDriverSection from "../../components/User/UI/BecomeDriverSection";
import Testimonial from "../../components/User/UI/Testimonial";

import BlogList from "../../components/User/UI/BlogList";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:4000/user/getexpert")
    .then(res => setItems(res.data))
    
    .catch(err => console.error(err));
  }, []);
  return (
  

    <Helmet title="Home">
       <Header/>
         
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Find your best voluenteer here</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindVolForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>
    
            {items.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>
      
            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section>
      <Footer/>
    </Helmet>
  );
};

export default Home;
