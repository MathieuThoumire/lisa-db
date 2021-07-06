import React, { FunctionComponent, Fragment } from "react";
import { Link } from "@chakra-ui/react";

export const LocaleSwitch: FunctionComponent = () => {
  return (
    <Fragment>
      <Link to="/"> EN </Link>|<Link to="/"> FR </Link>|<Link to="/"> PT </Link>
    </Fragment>
  );
};
