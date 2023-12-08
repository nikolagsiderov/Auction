import { components } from "./components";
import { typography } from "./typography";
import { primary, colors } from "../../../shared/theme/colors";

const THEMES = {
  DEFAULT: "DEFAULT",
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const themesOptions = {
  [THEMES.DEFAULT]: {
    typography,
    breakpoints,
    components: {
      ...components,
    },
    palette: {
      primary: {
        ...primary,
      },
      ...colors,
    },
  },
};

const themeOptions = () => {
  let themeOptions = themesOptions[THEMES.DEFAULT];
  return themeOptions;
};

export default themeOptions;
