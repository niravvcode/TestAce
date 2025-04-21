import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";


function NavLinks() {
  return (
    <div className="flex flex-wrap gap-4 bg-transparent">
      <NavLink
        to="/"
        className="bg-transparent flex text-gray-900 text-sm font-medium cursor-pointer hover:text-blue-800"
      >
        Home
      </NavLink>
      <Link
        to="topics"
        smooth={true}
        duration={300}
        spy={true}
        activeClass="text-blue-700"
        className="bg-transparent text-gray-900 text-sm font-medium cursor-pointer hover:text-blue-800"
      >
        Topics
      </Link>
      <Link
        to="about"
        smooth={true}
        duration={300}
        spy={true}
        activeClass="text-blue-700"
        className="bg-transparent text-gray-900 text-sm font-medium cursor-pointer hover:text-blue-800"
      >
        About
      </Link>
      <Link
        to="contact"
        smooth={true}
        duration={300}
        spy={true}
        activeClass="text-blue-700"
        className="bg-transparent text-gray-900 text-sm font-medium cursor-pointer hover:text-blue-700"
      >
        Contact
      </Link>
      <NavLink
        to="leaderboard"
        className="bg-transparent text-gray-900 text-sm font-medium cursor-pointer hover:text-blue-800"
      >
        Leader board
      </NavLink>
      <NavLink
        to="liveTest"
        className="bg-transparent text-gray-900 text-sm font-medium cursor-pointer hover:text-blue-800"
      >
        Live test
      </NavLink>
    </div>
  );
}

export default NavLinks;
