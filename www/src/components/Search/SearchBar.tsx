import { Input } from "@chakra-ui/react";
import React, { FunctionComponent, Fragment } from "react";

export const SearchBar: FunctionComponent = () => {
  return (
    <Fragment>
      <Input placeholder="eg: how to help  my student become more focused?" />
    </Fragment>
  );
};
