import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup } from "reactstrap";
import Helmet from "../../components/User/Helmet/Helmet";
import CommonSection from "../../components/User/UI/CommonSection";
import CarItem from "../../components/User/UI/CarItem";
import volData from "../../assets/data/volData";
import Header from "../../components/User/Header/Header";
import Footer from "../../components/User/Footer/Footer";
import axios from "axios";
import "../../styles/User/voluenteer.css"
const VoluenteerListing = () => {


  const [query, setquery] = useState('');
  
 
  const [items, setItems] = useState([]);
  // const keys=["name","service","city"]
 


  useEffect(() => {
    axios.post("/user/getexpert")
      .then(res => setItems(res.data))

      .catch(err => console.error(err));
  }, []);
 

  return (
    <Helmet title="Cars">
      <Header />
      <CommonSection title="Voluenteer Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">

              <div>

                <input type="text" placeholder="Search" className="search" style={{ marginBottom: "30px" }} onChange={(e) => { setquery(e.target.value) }} />
              </div>











              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>
            
            {items.filter((items)=>{
              // return keys.some((keys)=>item[keys].toLowerCase().includes(query))
            
            return items.service.toLowerCase().includes(query)|| items.name.toLowerCase().includes(query)
            }).map((item) => (
              <CarItem item={item} key={item.id} />

            ))}

 


            {/* <ul>
      {items.map(item => (
        <li key={item._id}>
          <h3>{item.name}</h3>
          <p></p>
        </li>
      ))}
    </ul>  */}
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};
export default VoluenteerListing;
