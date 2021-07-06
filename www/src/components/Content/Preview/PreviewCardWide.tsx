import { Box, Image, Link, Text } from "@chakra-ui/react";
import React, { FunctionComponent, Fragment } from "react";

export const PreviewCardWide: FunctionComponent = () => {
  return (
    <Fragment>
      <Box
        p={4}
        display={{ md: `flex` }}
        border="aquamarine"
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Box flexShrink={0}>
          <Image
            borderRadius="lg"
            width={{ md: 40 }}
            src="https://bit.ly/2jYM25F"
            alt="Woman paying for a purchase"
          />
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
          >
            Attention Age 5-10
          </Text>
          <Link
            mt={1}
            display="block"
            fontSize="lg"
            lineHeight="normal"
            fontWeight="semibold"
            href="#"
          >
            Title of the article
          </Link>
          <Text mt={2} color="gray.500">
            Le Lorem Ipsum est simplement du faux texte employé dans la
            composition et la mise en page avant impression. Le Lorem Ipsum est
            le faux texte standard de imprimerie depuis les années 1500, quand
            un imprimeur anonyme assembla ensemble des morceaux de texte pour
            réaliser un livre spécimen de polices de texte. Il a pas fait que
          </Text>
        </Box>
      </Box>
    </Fragment>
  );
};
