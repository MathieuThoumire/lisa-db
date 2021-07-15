import React, { Fragment, FunctionComponent } from "react";
import {
  Flex,
  Heading,
  ListItem,
  Link,
  Box,
  UnorderedList,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { z } from "zod";
import { completeDataList } from "@lisa-db/sdk/build/utils";
import { LisaDbCollections } from "@lisa-db/sdk";

import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../components/Search/SearchBar";
import { getLisaDbClientFromEnv } from "../../../lib/LisaDbClient";

type GuidePageStaticProps = {
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

const GuidePage: FunctionComponent<GuidePageStaticProps> = ({
  localeId,
  guide,
  guideLocales,
  guideLocaleVersions,
}) => {
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
        </Flex>
        <Box>
          <SideBar />
        </Box>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<GuidePageStaticProps> = async ({
  params,
}) => {
  const { localeId } = z
    .object({
      localeId: z.string(),
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
    },
  };
};

export const getStaticPaths: GetStaticPaths<{
  readonly localeId: string;
}> = async () => {
  const client = await getLisaDbClientFromEnv();
  const guide = await client
    .items(`lisa_guide_locale`)
    .readMany()
    .then(completeDataList);

  return {
    paths: guide.flatMap(({ locale_id: localeId }) => ({
      params: {
        localeId: z.string().parse(localeId),
      },
    })),
    fallback: false,
  };
};

export default GuidePage;
