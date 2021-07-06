import React, { Fragment, FunctionComponent } from "react";
import {
  Flex,
  Heading,
  List,
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

const DomainPage: FunctionComponent = () => {
  return (
    //MAP patern react tu renvoie un element react
    //KEY
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
                  Domain ( all domains, grouped by domain category, List of
                  links)
                </Heading>
              </Box>
            </Flex>
            <Flex>
              <UnorderedList>
                <ListItem>
                  <Link href="/en/domain-category/behavior">
                    <Text fontSize="3xl">Behavior</Text>
                  </Link>
                </ListItem>
                <List>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/behavior">Behavior</Link>
                  </ListItem>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/behavior">Behavior</Link>
                  </ListItem>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/behavior">Behavior</Link>
                  </ListItem>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/behavior">Behavior</Link>
                  </ListItem>
                </List>
                <ListItem>
                  <Link href="/en/domain-category/cognition">
                    <Text fontSize="3xl">Cognition</Text>
                  </Link>
                </ListItem>
                <List>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/cognition">cognition</Link>
                  </ListItem>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/cognition">cognition</Link>
                  </ListItem>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/cognition">cognition</Link>
                  </ListItem>
                  <ListItem>
                    {` `}
                    <Link href="/en/domain-category/cognition">cognition</Link>
                  </ListItem>
                </List>
                <ListItem>
                  <Link href="/en/domain-category/emotions">
                    <Text fontSize="3xl">Emotions</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/health">
                    <Text fontSize="3xl">Health</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/language">
                    <Text fontSize="3xl">Language</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/learning">
                    <Text fontSize="3xl">Learning</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/personal_and_personality">
                    <Text fontSize="3xl">Personal and personality</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/Social_function">
                    <Text fontSize="3xl">Social function</Text>
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

export default DomainPage;
