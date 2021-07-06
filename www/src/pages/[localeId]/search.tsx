import { FunctionComponent, Fragment } from "react";
import { Flex, Box, Heading, Checkbox, HStack } from "@chakra-ui/react";

import Footer from "../../components/Shell/Footer";
import TopBar from "../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../components/Search/SearchBar";
import { PreviewCardWide } from "../../components/Content/Preview/PreviewCardWide";
const SearchPage: FunctionComponent = () => {
  return (
    <Fragment>
      <TopBar />
      <Box paddingTop="100" w="80%" m="auto">
        <SearchBar />
      </Box>
      <Flex justifyContent="center" align="center">
        <Box w="80%">
          <Box>
            <Flex justifyContent="space-between">
              <Box>
                <Heading as="h2" size="lg" w="100%" m="auto" padding={10}>
                  <HStack spacing={10} direction="row">
                    <Checkbox size="md" colorScheme="green">
                      Age 5 - 10
                    </Checkbox>
                    <Checkbox size="md" colorScheme="green">
                      Age 11 - 13
                    </Checkbox>
                    <Checkbox size="md" colorScheme="green" defaultChecked>
                      Age 14 - 16
                    </Checkbox>
                  </HStack>
                </Heading>
              </Box>
            </Flex>
            <Flex
              w="90%"
              m="auto"
              flexDirection="column"
              wrap={{ base: `wrap`, md: `wrap`, lg: `unset` }}
            >
              <PreviewCardWide />
              <PreviewCardWide />
              <PreviewCardWide />
              <PreviewCardWide />
              <PreviewCardWide />
            </Flex>
          </Box>

          <Box></Box>
          <Box></Box>
        </Box>
        <Box>
          <SideBar />
        </Box>
      </Flex>

      <Footer />
    </Fragment>
  );
};

export default SearchPage;
