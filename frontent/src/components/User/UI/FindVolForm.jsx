import React from "react";
import "../../../styles/User/find-car-form.css";
import "../../../styles/User/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindVolForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="From address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="To address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="service date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time"
            type="time"
            placeholder="service time"
            required
          />
        </FormGroup>
        <FormGroup className="select__group">
          <select>
            <option value="ac">Byestanders</option>
            <option value="non-ac">Pick and Drop</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find Voluenteer</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindVolForm;
