import { Badge } from "@mui/material";
import { Home, Person, Category, LocalMall } from "@mui/icons-material";
import useWindowSize from "hooks/useWindowSize";
import { StyledNavLink, Wrapper } from "./styles";

const MobileNavigationBar = () => {
  const width = useWindowSize();
  return width <= 900 ? (
    <Wrapper>
      <StyledNavLink href={"/"} key={"home"}>
        <Home />
        Начало
      </StyledNavLink>
      <StyledNavLink href={"/items"} key={"items"}>
        <Badge badgeContent={3} color="primary">
          <Category />
        </Badge>
        Аукциони
      </StyledNavLink>
      <StyledNavLink href={"profile"} key={"profile"}>
        <Person />
        Профил
      </StyledNavLink>
    </Wrapper>
  ) : null;
};

export default MobileNavigationBar;
