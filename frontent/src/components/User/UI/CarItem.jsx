import React from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/User/car-item.css";




const CarItem = (props) => {
  const { image, Hour, name, service, Time, price,gender,state,city,_id,number } = props.item;
 const navigate = useNavigate()

  return (
    
      
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={image} alt="" className="w-100" style={{height:"30rem"}} />
          <img src="" alt="" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{name}</h4>
          <h6 className="rent__price text-center mt-">
            {price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {service}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {gender}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {state}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {city}
            </span>
          </div>

          <button onClick={()=>{
            navigate('/volenteerListing/details',{state:_id})
          }} className=" w-50 car__item-btn car__btn-rent"style={{color:"white"}} >
             Hire
          </button>

          <button onClick={()=>{
            navigate('/volenteerListing/details',{state:_id})
          }} className=" w-50 car__item-btn car__btn-rent" style={{color:"white"}}>
             Details
          </button>
        </div>
      </div>
    </Col>
   
    
  );
};


export default CarItem;
