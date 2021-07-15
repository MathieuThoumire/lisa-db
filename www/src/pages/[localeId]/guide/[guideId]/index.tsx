import { GetStaticPaths, GetStaticProps } from "next";
import React, { FunctionComponent, Fragment } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { completeDataList } from "@lisa-db/sdk/build/utils";
import { z } from "zod";
import { LisaDbCollections } from "@lisa-db/sdk";

import { SideBar } from "../../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../../components/Search/SearchBar";
import Footer from "../../../../components/Shell/Footer";
import TopBar from "../../../../components/Shell/TopBar/TopBar";
import { getLisaDbClientFromEnv } from "../../../../lib/LisaDbClient";

type GuideIdPageStaticProps = {
  readonly localeId: string;
  readonly guide: Required<LisaDbCollections["lisa_guide"]>[];
  readonly guideLocales: Required<LisaDbCollections["lisa_guide_locale"]>[];
  readonly guideLocaleVersions: Required<
    LisaDbCollections["lisa_guide_locale_version"]
  >[];
  readonly guideLocaleAuthor: Required<
    LisaDbCollections["lisa_guide_locale_author"]
  >[];
};

const GuideIdPage: FunctionComponent<GuideIdPageStaticProps> = ({
  localeId,
  guide,
  guideLocales,
  guideLocaleVersions,
}) => {
  const guideLocaleVersion = guideLocaleVersions.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )[0];
  if (!guideLocaleVersion) {
    return null;
  }
  return (
    <Fragment>
      <TopBar />
      <Flex paddingTop={100} w="80%" m="auto">
        <SearchBar />
      </Flex>
      <Flex justifyContent="center" align="center">
        <Box w="80%">
          <Box>
            <Flex justifyContent="space-between">
              <Flex>
                <Heading as="h2" size="lg" w="100%" m="auto" padding={10}>
                  {guideLocaleVersion.name}
                </Heading>
              </Flex>
            </Flex>
            <Flex>
              <Box>
                <Text justifyContent="center" align="justify" w="90%" ml={10}>
                  {guideLocaleVersion.content_markdown}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Heading as="h2" size="lg" w="100%" m="auto" padding="10">
              Explore its subdomains :
            </Heading>
          </Box>
          <Box w="90%" m="auto">
            <Flex>
              <UnorderedList>
                {guide.map((guide) => {
                  const guideLocale = guideLocales.find(
                    (guideLocale) =>
                      guideLocale.lisa_guide_id === guide.lisa_guide_id &&
                      guideLocale.locale_id === localeId,
                  );
                  if (!guideLocale) {
                    return null;
                  }
                  const guideLocaleVersion = guideLocaleVersions.sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime(),
                  )[0];
                  if (!guideLocaleVersion) {
                    return null;
                  }
                  return (
                    <ListItem key={guide.lisa_guide_id}>
                      <Link href={`/${localeId}/guide/${guide.lisa_guide_id}`}>
                        {guideLocaleVersion.name}
                      </Link>
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Flex>
          </Box>
          <Box w="80%" m="auto" p="1"></Box>
        </Box>
        <Box>
          <SideBar />
        </Box>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<GuideIdPageStaticProps> = async ({
  params,
}) => {
  const { localeId, guideId } = z
    .object({
      localeId: z.string(),
      guideId: z.string(),
    })
    .parse(params);

  const client = await getLisaDbClientFromEnv();

  const guide = await client
    .items(`lisa_guide`)
    .readMany()
    .then(completeDataList);

  const guideLocales = await client
    .items(`lisa_guide_locale`)
    .readMany()
    .then(completeDataList);

  const guideLocaleVersions = await client
    .items(`lisa_guide_locale_version`)
    .readMany()
    .then(completeDataList);

  const guideLocaleAuthor = await client
    .items(`lisa_guide_locale_author`)
    .readMany()
    .then(completeDataList);

  return {
    props: {
      localeId,
      guide,
      guideLocales,
      guideLocaleVersions,
      guideLocaleAuthor,
      guideId,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{
  readonly guideId: string;
  readonly localeId: string;
}> = async () => {
  const client = await getLisaDbClientFromEnv();

  const guideLocale = await client
    .items(`lisa_guide_locale`)
    .readMany()
    .then(completeDataList);

  return {
    paths: guideLocale.map(
      ({ lisa_guide_id: guideId, locale_id: localeId }) => {
        return {
          params: {
            guideId: z.string().parse(guideId),
            localeId: z.string().parse(localeId),
          },
        };
      },
    ),
    fallback: false,
  };
};

export default GuideIdPage;
