import React, { FunctionComponent, Fragment } from "react";
import {
  Flex,
  Image,
  Text,
  Box,
  Heading,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { lorem } from "../../../lib/MockData";
import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";

const AboutPage: FunctionComponent = () => {
  return (
    <Fragment>
      <TopBar />

      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
        align="center"
        justifyItems="space-around"
        flexDirection="column"
      >
        <Flex>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/en/about/approach">
                Approach
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/en/about/behavior">
                Behavior
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/en/about/history"> History</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/en/about/team">Team</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Box display="block">
          <Image
            width="max-content"
            height="max-content"
            marginBottom="20"
            src="https://picsum.photos/seed/picsum/1000/300"
          />
        </Box>

        <Box textAlign="center" display="block">
          <Heading as="h1" size="3xl" marginBottom="5">
            About Us
          </Heading>
        </Box>

        <Box width="80%" display="block">
          {` `}
          <Text justifyContent="center" align="justify">
            {lorem(2500)}
          </Text>
        </Box>
      </Flex>

      <Footer />
    </Fragment>
  );
};

export default AboutPage;
