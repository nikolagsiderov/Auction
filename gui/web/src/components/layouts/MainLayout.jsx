import { Fragment, useCallback, useState } from "react";
import Sticky from "components/Sticky";
import Topbar from "components/Topbar";
import Footer from "components/Footer";
import Header from "components/Header";
import Navbar from "components/navbar/Navbar";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import SearchInput from "components/search-box/SearchInput";

const MainLayout = ({ children, showTopbar = true, showNavbar = true }) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  return (
    <Fragment>
      {/* TOPBAR */}
      {showTopbar && <Topbar />}

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} searchInput={<SearchInput />} />
      </Sticky>

      <div className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {showNavbar && <Navbar elevation={0} border={1} />}

        {/* BODY CONTENT */}
        {children}
      </div>

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />

      {/* FOOTER */}
      <Footer />
    </Fragment>
  );
};
export default MainLayout;
