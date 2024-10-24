import React from "react";
import { HeaderStyles, NavDiv, NavLink } from "../styles/styles";

const HeaderMenu = () => {
  return (
    <HeaderStyles>
      <NavDiv>
        <ul>
          <li>
            <NavLink to="/">Cards List</NavLink>
          </li>
          <li>
            <NavLink to="/create_card">Create Card</NavLink>
          </li>
        </ul>
      </NavDiv>
    </HeaderStyles>
  );
};

export default HeaderMenu;
