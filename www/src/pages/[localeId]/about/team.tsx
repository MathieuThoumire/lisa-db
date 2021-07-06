import React, { FunctionComponent, Fragment } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";
import { PersonCard } from "../../../components/Content/Person/PersonCard";

const TeamPage: FunctionComponent = () => {
  return (
    <Fragment>
      <TopBar />

      <Box textAlign="center" paddingTop="100">
        <Box>
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
            <BreadcrumbItem>
              <BreadcrumbLink href="/en/about/history"> History</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/en/about/team">Team</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Heading as="h1" size="4xl">
          About
        </Heading>
        <Text color="gray.400">Team Collaborator</Text>
      </Box>
      <Flex
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
      >
        <PersonCard />
        <PersonCard />
        <PersonCard />
      </Flex>
      <Flex
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
      >
        <PersonCard />
        <PersonCard />
        <PersonCard />
      </Flex>

      <Footer />
    </Fragment>
  );
};

export default TeamPage;
