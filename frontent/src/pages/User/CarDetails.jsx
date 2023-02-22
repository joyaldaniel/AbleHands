import React, { useEffect, useState } from "react";
import Header from "../../components/User/Header/Header";
import Footer from "../../components/User/Footer/Footer";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../components/User/Helmet/Helmet";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/User/booking-form.css";
// import masterCard from "../../assets/all-images/";
// import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/User/payment-method.css";
import { useSelector } from "react-redux"




const CarDetails = () => {

  const [voluenteer, setvoluenteer] = useState('');
  const [journeyTime, setjourneyTime] = useState('');
  const [bookedBy, setBookedBy] = useState('');
 

  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState("");

  const [items, setItems] = useState({});

  const location = useLocation()
  const id = location.state




  // console.log(id)


  useEffect(() => {
    axios.post(`http://localhost:4000/user/getexpertdetails/${id}`)
      // .then(response => setItems(response.data))
      .then(response => {
        const items = response.data;
        setItems(items)





      })

      .catch(error => console.error(error));
  }, [id]);

  const expertName = items.name
  const Expertemail = items.email

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    fromAddress: '',
    person: '',
    luggage: '',
    journeyDate: '',
    journeyTime: '',
    textarea: '',
    pinnumber: "",


  });

  const handleInputChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const userId = localStorage.getItem("email")
  // console.log(formData,"hi")

  // const handleCheckout =async () => {
  // // if(!formData===null&&!formData ===undefined){
  //   const res= await  axios.post("/user/stripe_payment", {  items, userId })
  
  //   window.location.href=res.data.url

  // // }

   

  // }


  // console.log(userId )

  const submitHandler = async(event) => {
    event.preventDefault(event);

    // try {
    //   // Send a POST request to the API to book the time slot

    //   await axios.post('user/bookingstime', { Expertemail: Expertemail, formData: formData});
    //   console.log("fortent");
     
    // } catch (error) {
    //   console.error(error);
    //   alert('Booking failed');
    // }
    // console.log("hai");

   
   await axios.post('/user/paymentdetails', { Expertemail: Expertemail, formData: formData, userId: userId })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const userId = localStorage.getItem("email")      
     const datas=[
       Expertemail, 
       formData,
        userId,
        expertName
     ]
  
        navigate('/payment_stripe',{state:datas})
      })
      .catch(error => {
        console.error(error);
        alert('This section is already exist');
      });

  };


  //  const handleCheckout=(event)=>{
  //   event.preventDefault();


  //   }




  return (


    <Helmet title={items.name}>
      <Header />
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={items.image} alt="" className="w-100" />
            </Col>

            <Col lg="6">

              <div className="car__info">
                <h2 className="section__title">{items.Name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {items.price}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({items.rating} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {items.name}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {items.service}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {items.gender}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {items.number}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {items.state}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {items.city}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      // class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {/* {items.data} */}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                {/* <BookingForm /> */}

                <Form onSubmit={submitHandler}>
                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input type="text" placeholder="First Name" name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required />
                  </FormGroup>
                  <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input type="text" placeholder="Last Name" name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required />
                  </FormGroup>

                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input type="email" placeholder="Email" name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required />
                  </FormGroup>
                  <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input type="number" placeholder="Phone Number" name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required />
                  </FormGroup>

                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input type="text" placeholder="From Address" name="fromAddress"
                      value={formData.fromAddress}
                      onChange={handleInputChange} required />
                  </FormGroup>
                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input type="number" placeholder="Pin Number" name="pinnumber"
                      value={formData.pinnumber}
                      onChange={handleInputChange} required />
                  </FormGroup>



                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <select name="person" id="person" value={formData.person} onChange={handleInputChange} required>
                      <option value="select">select one</option>
                      <option value="1 person">1 Person</option>
                      <option value="2 person">2 Person</option>
                      <option value="3 person">3 Person</option>
                      <option value="4 person">4 Person</option>
                      <option value="5 person">5 Person</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <select name="luggage" id="luggage" value={formData.luggage} onChange={handleInputChange} required>
                      <option value="select">select one</option>
                      <option value="no luggage">no luggage</option>
                      <option value="1 luggage">1 luggage</option>
                      <option value="2 luggage">2 luggage</option>
                      <option value="3 luggage">3 luggage</option>
                      <option value="4 luggage">4 luggage</option>
                      <option value="5 luggage">5 luggage</option>
                    </select>
                  </FormGroup>

                  <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input type="date" placeholder="Journey  Date" name="journeyDate"
                      value={formData.journeyDate} onChange={handleInputChange} required
                    />
                  </FormGroup>
                  <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input
                      type="time"
                      placeholder="Journey Time"
                      className="time__picker"
                      name="journeyTime"
                      value={formData.journeyTime}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>


                  <FormGroup>

                    <textarea
                      rows={5}
                      type="text"
                      className="textarea"
                      placeholder="Write"
                      name="textarea"
                      value={formData.textarea}
                      onChange={handleInputChange}

                    ></textarea>
                  </FormGroup>

                  <FormGroup>

                    <Col lg="5" className="mt-5">
                      <div className="payment__info mt-5">
                        <h5 className="mb-4 fw-bold ">Payment Information</h5>
                        {/* <PaymentMethod /> */}

                        <div className="payment">
                          <label htmlFor="payment" className="d-flex align-items-center gap-2" >
                            {/* <input type="radio" /> Direct Bank Transfer */}
                          </label>
                        </div>

                        <div className="payment mt-3">
                          <label htmlFor="payment" className="d-flex align-items-center gap-2">
                            {/* <input type="radio" /> Cheque Payment */}
                          </label>
                        </div>

                        <div className="payment mt-3 d-flex align-items-center justify-content-between">
                          <label htmlFor="payment" className="d-flex align-items-center gap-2">
                            {/* <input type="radio" /> Master Card */}
                          </label>

                          <img
                            // src={masterCard} 
                            alt="" />
                        </div>

                        <div className="payment mt-3 d-flex align-items-center justify-content-between">
                          <label htmlFor="ByHand" className="d-flex align-items-center gap-2">
                            {/* <input type="radio" name="ByHand" id="ByHand" value="ByHand"  /> ByHand */}
                          </label>


                          <img
                            // src={paypal} 
                            alt="" />
                        </div>
                        <div className="payment mt-3 d-flex align-items-center justify-content-between">
                          <label htmlFor="stripe" className="d-flex align-items-center gap-2" required  >
                            <input type="radio" name="paymentOpt" id="stripe" value="stripe" 
                              //  checked={selectedOption === "stripe"} 
                             
                              onChange={handleInputChange}
                            /> Stripe
                          </label>


                          <img
                            // src={paypal}
                            alt="" />
                        </div>
                        <div className="payment text-end mt-5">
                          <p>Please Click here to conform the Reservation</p>
                          <button
                          //  onClick={()=>{
                          //   navigate('/your_order',{state:Expertemail})
                          //  }}
                          // onClick={() => handleCheckout()} 
                          >Reserve Now</button>
                        </div>

                      </div>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </Col>


          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};
export default CarDetails;
