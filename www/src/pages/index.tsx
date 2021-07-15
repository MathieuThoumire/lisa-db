import React, { FunctionComponent, Fragment } from "react";
import { Flex, Box, Heading, Text, Image, Link } from "@chakra-ui/react";

import { SideBar } from "../components/Shell/SideBar/SideBar";
import Footer from "../components/Shell/Footer";
import { SearchBar } from "../components/Search/SearchBar";
import TopBar from "../components/Shell/TopBar/TopBar";

const IndexPage: FunctionComponent = () => {
  return (
    <Fragment>
      <TopBar />
      <Flex justifyContent="center" align="center">
        <Box>
          <Flex height="100vh" justifyContent="center" align="center">
            <Flex>
              {` `}
              <Box justifyContent="space-between">
                <Box textAlign="center">
                  <Heading as="h1" size="4xl" padding={25}>
                    Welcome to LISA DataBase
                  </Heading>
                  <Text color="gray.400">
                    Research-validated instructions to empower young generation
                  </Text>
                </Box>
                <Flex justifyContent="space-between">
                  <Box paddingTop={7} w="80%" m="auto">
                    <SearchBar />
                  </Box>
                </Flex>
                <Box paddingTop={7}>
                  Reserved: Slogan or logos of partner organization
                </Box>
                <Flex height="container" justifyContent="space-between">
                  <Image
                    src="logo.png"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                  <Image
                    src="logo.png"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                  <Image
                    src="logo.png"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </Flex>
                <Flex
                  height="container"
                  justifyContent="space-between"
                  paddingTop={7}
                >
                  <Image
                    src="logo.png"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                  <Image
                    src="logo.png"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                  <Image
                    src="logo.png"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box p={10}>
          <SideBar />
        </Box>
      </Flex>
      <Box>
        <Link href="/en">/en</Link>
      </Box>
      <Box>
        <Link href="/en/domain-category ">/en/domain-category </Link>
      </Box>
      <Box>
        <Link href="/en/domain-category/cognition">
          /en/domain-category/cognition
        </Link>
      </Box>
      <Box>
        <Link href="/en/domain-category/cognition/v/1c4256bb-c441-4f54-9b66-2f68161dd1e1">
          /en/domain-category/cognition/v/1c4256bb-c441-4f54-9b66-2f68161dd1e1
        </Link>
      </Box>
      <Box>
        <Link href="/en/domain ">/en/domain</Link>
      </Box>
      <Box>
        <Link href=" /en/domain/attention">/en/domain/attention</Link>
      </Box>
      <Box>
        <Link href="/en/domain/attention/v/1e675c5f-bd4a-4b0f-b2f7-8fb122d113af ">
          /en/domain/attention/v/1e675c5f-bd4a-4b0f-b2f7-8fb122d113af{` `}
        </Link>
      </Box>
      <Box>
        <Link href="/en/guide">/en/guide</Link>
      </Box>
      <Box>
        <Link href="/en/guide/cognition-attention">
          /en/guide/cognition-attention
        </Link>
      </Box>
      <Box>
        <Link href="/en/guide/cognition-attention/v/a5495443-915a-4422-b7a1-5514b63494c5">
          /en/guide/cognition-attention/v/a5495443-915a-4422-b7a1-5514b63494c5
        </Link>
      </Box>
      <Footer />
    </Fragment>
  );
};

export default IndexPage;
