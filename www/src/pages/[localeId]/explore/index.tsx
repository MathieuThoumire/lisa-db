import { FunctionComponent, Fragment } from "react";
import { Flex, Text, Box, Heading, Link } from "@chakra-ui/react";

import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";
import { SearchBar } from "../../../components/Search/SearchBar";
import { lorem } from "../../../lib/MockData";
const ExplorePage: FunctionComponent = () => {
  return (
    <Fragment>
      <TopBar />
      <Box paddingTop={100} w="80%" m="auto">
        <SearchBar />
      </Box>
      <Flex justifyContent="space-between">
        <Box>
          <Heading as="h2" size="lg" w="100%" m="auto" padding={10}>
            Explore the LISA database
          </Heading>
          <Text color="gray.400" padding={10}>
            LISA database
          </Text>
        </Box>
      </Flex>
      <Heading as="h1" size="md" w="100%" m="auto" padding={10}>
        <Link href="/"> By Age-oriented collection</Link>
      </Heading>
      <Flex>
        <Box>
          {` `}
          <Text justifyContent="center" align="justify" w="90%" ml={10}>
            {` `}
            {lorem(1500)}
          </Text>
        </Box>
      </Flex>
      <Heading as="h1" size="md" w="100%" m="auto" padding={10}>
        <Link href="/"> By Guide Trend</Link>
      </Heading>
      <Flex>
        <Box>
          {` `}
          <Text justifyContent="center" align="justify" w="90%" ml={10}>
            {` `}
            {lorem(1500)}
          </Text>
        </Box>
      </Flex>
      <Heading as="h1" size="md" w="100%" m="auto" padding={10}>
        <Link href="/"> By Domains</Link>
      </Heading>
      <Flex>
        <Box>
          {` `}
          <Text justifyContent="center" align="justify" w="90%" ml={10}>
            {` `}
            {lorem(1500)}
          </Text>
        </Box>
      </Flex>

      <Footer />
    </Fragment>
  );
};

export default ExplorePage;
