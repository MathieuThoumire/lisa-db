import React, { FunctionComponent, Fragment } from "react";
import {
  Flex,
  Text,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { lorem } from "../../../lib/MockData";
import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";

const HistoryPage: FunctionComponent = () => {
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
        <Flex textAlign="center" display="block">
          <Heading as="h1" size="4xl" marginBottom="5">
            History
          </Heading>
          <Text>{lorem(150)}</Text>
        </Flex>
      </Flex>

      <Footer />
    </Fragment>
  );
};

export default HistoryPage;
