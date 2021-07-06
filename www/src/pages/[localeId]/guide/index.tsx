import React, { Fragment, FunctionComponent } from "react";
import {
  Flex,
  Heading,
  ListItem,
  Link,
  Text,
  Box,
  UnorderedList,
} from "@chakra-ui/react";

import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../components/Search/SearchBar";

const DomainCategoryPage: FunctionComponent = () => {
  return (
    <Fragment>
      <TopBar />
      <Flex paddingTop={100} w="80%" m="auto">
        <SearchBar />
      </Flex>
      <Flex justifyContent="center" height="100vh" paddingTop={10}>
        <Flex w="80%">
          <Box>
            <Flex>
              <Box>
                <Heading as="h2" size="lg" m="auto">
                  Guides (all guides sorted by last version date)
                </Heading>
              </Box>
            </Flex>
            <Flex>
              <UnorderedList>
                <ListItem>
                  <Link href="/en/domain-category/behavior">
                    <Text fontSize="3xl">Attention</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/emotions">
                    <Text fontSize="3xl">Writing</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/health">
                    <Text fontSize="3xl">Reading</Text>
                  </Link>
                </ListItem>
              </UnorderedList>
            </Flex>
          </Box>
        </Flex>
        <Box>
          <SideBar />
        </Box>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default DomainCategoryPage;
