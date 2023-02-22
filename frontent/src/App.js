// import Layout from "../src/components/User/Layout/Layout.jsx";
import React, { Component }  from 'react';
import Routers from "./routers/Routers.js";
import AdminRouter from "./routers/AdminRouter"
import ExpertRouter from "./routers/ExpertRouter"

function App() {
  // return <Layout />;

 return (
 <>
 <Routers/>
 <AdminRouter/>
 <ExpertRouter/>
 </>
 )
}

export default App;
