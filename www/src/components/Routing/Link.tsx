import React, { FunctionComponent } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

export const Link: FunctionComponent<
  Omit<ChakraLinkProps, "href"> & {
    readonly href: NextLinkProps["href"];
  }
> = ({ href, ...props }) => (
  <NextLink href={href} passHref>
    <ChakraLink {...props} />
  </NextLink>
);
