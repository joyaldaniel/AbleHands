import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../../components/User/Helmet/Helmet";
import CommonSection from "../../components/User/UI/CommonSection";
import BlogList from "../../components/User/UI/BlogList";
import Header from "../../components/User/Header/Header"
import Footer from "../../components/User/Footer/Footer"
const Blog = () => {
  return (
    <Helmet title="Blogs">
      <Header />
      <CommonSection title="Blogs" />
      <section>
        <Container>
          <Row>
            <BlogList />
            <BlogList />
          </Row>
        </Container>
      </section>
      <Footer/>
    </Helmet>
  );
};

export default Blog;
