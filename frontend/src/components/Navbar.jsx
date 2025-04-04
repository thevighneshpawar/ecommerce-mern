import { React, useState, useContext, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets"
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {

  const [isVisible, setIsVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const { setSearch, getCartCount,navigate,token,setToken,setCartItems } = useContext(ShopContext);
  const location = useLocation();

  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }

  useEffect(() => {
    setShowSearch(false)
    setSearch('')
  }, [location])

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearch('');
    }
  };

  return (
    <>
      {/* Wrapper div for fixed positioning */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50">
        {/* Main Navbar */}
        <nav className="border-b">
          <div className="mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <div className="items-center relative justify-between py-6 font-medium flex">
              <Link to='/' className="flex-shrink-0">
                <img src={assets.logo} alt="logo" className="w-36 object-contain" />
              </Link>

              {/* Navigation Links */}
              <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
                <NavLink to='/' className="flex flex-col gap-1 items-center">
                  <p>HOME</p>
                  <hr className="bg-gray-700 h-[2px] w-2/4 hidden" />
                </NavLink>
                <NavLink to='/collection' className="flex flex-col gap-1 items-center">
                  <p>COLLECTION</p>
                  <hr className="bg-gray-700 h-[2px] w-2/4 hidden" />
                </NavLink>
                <NavLink to='/about' className="flex flex-col gap-1 items-center">
                  <p>ABOUT</p>
                  <hr className="bg-gray-700 h-[2px] w-2/4 hidden" />
                </NavLink>
                <NavLink to='/contact' className="flex flex-col gap-1 items-center">
                  <p>CONTACT</p>
                  <hr className="bg-gray-700 h-[2px] w-2/4 hidden" />
                </NavLink>
                {/* <NavLink to='/admin' className="flex flex-col gap-1 items-center">
                  <p>Admin Panel</p>
                  <hr className="bg-gray-700 h-[2px] w-2/4 hidden" />
                </NavLink> */}
              </ul>

              {/* Icons Section - Fixed position */}
              <div className="flex items-center gap-6">
                <button
                  onClick={handleSearchClick}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <img
                    src={assets.search_icon}
                    alt="search"
                    className="w-5 h-5"
                  />
                </button>

                <div className="group relative">

                  {/* Profile Icon */}

                  <Link to='/login'>
                  <img
                    onClick={()=> token ? null: navigate('/login')}
                    className="w-5 cursor-pointer"
                    src={assets.profile_icon}
                    alt="Profile Icon"
                  />
                  </Link>
                 

                  {/* Dropdown Menu */}

                  {
                    token &&
                    <div className="group-hover:block hidden absolute dropdown-menu left-1 pt-4">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-800">
                      <p onClick={()=>navigate('/profile')} className="cursor-pointer hover:text-black">My Profile</p>
                      <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                      <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                    </div>
                  </div>
                  }
                </div>

                <Link to="/cart" className="p-1 hover:bg-gray-100 rounded-full transition-colors relative">
                  <img src={assets.cart_icon} alt="cart" className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                 rounded-full w-4 h-4 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Search Bar Container */}
        {showSearch && (
          <div className="">
            <div className="mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
              <div className="flex justify-end py-4">
                <div className="w-[300px]"> {/* Fixed width for search container */}
                  <SearchBar onClose={() => setShowSearch(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer div */}
      <div className={`${showSearch ? 'h-[180px]' : 'h-[120px]'} transition-all duration-200`} />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Your content will go here */}
      </div>

      {/* Mobile Menu */}
      {isVisible && (
        <div className="mobile-menu sm:hidden fixed top-0 left-0 w-full h-screen bg-white z-50">
          <div className="">
            <div className="flex justify-start items-center gap-4 pl-4 py-4 pt-2">
              <img
                src={assets.dropdown_icon}
                alt="close"
                className="h-4 rotate-180"
                onClick={() => setIsVisible(false)}
              />
              <p className="">Back</p>
            </div>
            <ul className="flex flex-col  text-lg text-gray-700 mt-2">
              <NavLink to='/' className=" border px-5 py-2" onClick={() => setIsVisible(false)}>
                <p>Home</p>
              </NavLink>
              <NavLink to='/collection' className="flex flex-col px-5 py-2 border " onClick={() => setIsVisible(false)}>
                <p>Collection</p>
              </NavLink>
              <NavLink to='/about' className="flex flex-col px-5 py-2 border " onClick={() => setIsVisible(false)}>
                <p>About</p>
              </NavLink>
              <NavLink to='/contact' className="flex flex-col px-5 py-2 border " onClick={() => setIsVisible(false)}>
                <p>Contact</p>
              </NavLink>
              {/* <NavLink to='/admin' className="flex flex-col px-5 py-2 border " onClick={() => setIsVisible(false)}>
                <p>Admin Panel</p>
              </NavLink> */}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

