import React, { useRef, useState} from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../../styles/User/header.css";


// import { useSelector} from "react-redux"
// import axios from "axios"


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/VoluenteerListing",
    display: "volunteer",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/chat",
    display: "chat",
  },
  // {
  //   path: "/your_order",
  //   display: "Your Booking",
  // },
];

const Header = () => {
  const menuRef = useRef(null);
  // const auth = useSelector(state => state.auth)
  // const {user, isLogged} = auth

 
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
      if (localStorage.getItem('email')) {
          setIsAuthenticated(true);
      }
  }, []);

  const logout = () => {
 
      localStorage.removeItem('email');
      
      setIsAuthenticated(false);
  }

  // const {user} = useContext;
  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +1-202-555-0149
                </span>
              </div>
            </Col>

            {/* { user ?user.email:(  */}
            {/* <div>
            <h1>Welcome to the Home page</h1>
            {isAuthenticated ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <Link to='/login'>Login</Link>
            )}
        </div> */}

{/* const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    return (
        <button onClick={logout}>Logout</button>
    );
} */}


            <div className="header__top__right d-flex align-items-center justify-content-end gap-3" >

            <Col lg="6" md="6" sm="6">

            {isAuthenticated ? (
                <Link to="/login" className=" d-flex align-items-center gap-1"  onClick={logout}>
                <i className="ri-login-circle-line" ></i> Logout
              </Link>
            ) :   
             <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="/login" className=" d-flex align-items-center gap-1">
                  <i className="ri-login-circle-line" ></i> Login
                </Link>
               <Link to="/register" className=" d-flex align-items-center gap-1">
                  <i className="ri-user-line"></i> Register
                </Link>
              </div>
              }
            </Col>
            </div>
            {/* )} */}
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i className="ri-wheelchair-fill"></i>
                    <span>
                      Able Hands
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h6>Trivandrum, Kerala</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Saturday</h4>
                  <h6>7am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
