import { useState } from "react";
// import { navLinks } from "../../constants";
import LoadingButton from "../Buttons/LoadingButton";
import styles from "../../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { logout } from "../../hooks/auth";
import logo from "@/assets/workhance.png";
import AccountDrawer from "./AccountDrawer/AccountDrawer";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { user, setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      logout();
      setUser(null);
      setToken(null);
    } else {
      navigate("/login");
    }
  };
  return (
    <header className={`bg-white shadow z-50`}>
      <nav className={`flex items-center justify-between py-1 px-32`}>
        <Link
          to={"/"}
          className={`flex text-xl text-white whitespace-nowrap items-center font-cbold`}
        >
          <img src={logo} alt="logo" className=" object-cover h-[50px]" />
          <h2 className="text-primary font-cbold text-xl ml-2 font-medium">
            Workhance.
          </h2>
        </Link>
        <ul className={`flex`}>
          {/* {navLinks.map((link, index) => {
            return (
              <Link
                to={link.slug}
                key={index}
                className={`text-primary flex items-center gap-2`}
              >
                <span className="text-xl text-primary">{link.icon}</span>
                <p className={`text-black`}>{link.title}</p>
              </Link>
            );
          })} */}
        </ul>
        <span>
          {!user && (
            <LoadingButton
              text={user ? "Logout" : "Login"}
              isLoading={false}
              onClick={handleClick}
              type="button"
            />
          )}
           {user && (
            <AccountDrawer />
          )}
        </span>

        <div className={`${styles.hb} flex-1 justify-end items-center`}>
          {toggle ? (
            <AiOutlineClose
              className="w-[28px] text-white cursor-pointer h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <RiMenu3Fill
              className="w-[28px] text-white cursor-pointer h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
          )}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul
              className={`list-none z-50 flex justify-end items-start flex-1 flex-col bg-fuchsia-900 p-10 rounded-3xl`}
            >
              {/* {navLinks.map((nav) => (
                <Link
                  to={nav.slug}
                  onClick={() => setToggle(!toggle)}
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-white text-[16px] mb-4`}
                >
                  <p>{nav.title}</p>
                </Link>
              ))} */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
