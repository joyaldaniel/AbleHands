import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
// import store from "./redux/admin/store"
// import { Provider } from "react-redux";
// import persistStore from "redux-persist/es/persistStore";


// let persistor =persistStore(store)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
   
    <Router>
  {/* <Provider store={store}>
  
       <PersistGate persistor={persistor}> */}
       
      <App />
      {/* </PersistGate>
      </Provider> */}
    </Router>
    
  // </React.StrictMode>
);
