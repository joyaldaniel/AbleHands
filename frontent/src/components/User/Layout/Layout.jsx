import React, { Fragment } from "react";
// import AdminHeader from "../../../components/Admin/Header"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../../routers/Routers";
import AdminRouter from "../../../routers/AdminRouter";
// import AdminHeader from "../../Admin/components/header/Header"
// import AdminRouters from "../../../../Admin/admin/src/router/AdminRouter";



const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />






        <div>
          <AdminRouter/>
        </div>




    </Fragment>

  );
};


// const adminLayout=()=>{
// return (
//   <Fragment>
//     <AdminHeader>
//      <div>
//       <AdminRouters/>
//      </div>
//     </AdminHeader>


//   </Fragment>
// )
// }

export default Layout;
