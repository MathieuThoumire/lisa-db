import { FunctionComponent, Fragment } from "react";
import { Flex, Image, Text, Box, Heading } from "@chakra-ui/react";

import { lorem } from "../../lib/MockData";
import Footer from "../../components/Shell/Footer";
import TopBar from "../../components/Shell/TopBar/TopBar";

const ResourcesPage: FunctionComponent = () => {
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
            Tools
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

export default ResourcesPage;
