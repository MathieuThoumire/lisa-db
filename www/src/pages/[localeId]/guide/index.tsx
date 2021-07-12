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
import { GetStaticPaths, GetStaticProps } from "next";
import { z } from "zod";
import { completeDataList } from "@lisa-db/sdk/build/utils";

import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../components/Search/SearchBar";
import { GuideLocaleAuthor, GuideVersion } from "../../../lib/Models";
import { getLisaDbClientFromEnv } from "../../../lib/LisaDbClient";

type GuidePageStaticProps = {
  readonly localeId: string;
  readonly guideLocaleVersion: GuideVersion;
  readonly guideLocaleAuthors: GuideLocaleAuthor[];
};

const DomainCategoryPage: FunctionComponent<GuidePageStaticProps> = () => {
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
export const getStaticProps: GetStaticProps<GuidePageStaticProps> = async ({
  params,
}) => {
  const { localeId } = z
    .object({
      localeId: z.string(),
    })
    .parse(params);

  const client = await getLisaDbClientFromEnv();

  const [guideLocale] = await client
    .items(`lisa_guide_locale`)
    .readMany({
      filter: {
        locale_id: localeId,
      },
      limit: 1,
    })
    .then(completeDataList);

  const [guideLocaleVersion] = await client
    .items(`lisa_guide_locale_version`)
    .readMany({
      filter: {
        lisa_guide_locale_id: guideLocale.lisa_guide_locale_id,
      },
    })
    .then(completeDataList)
    .then((guideLocaleVersions) =>
      guideLocaleVersions.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );

  const guideLocaleAuthors = await client
    .items(`lisa_guide_locale_author`)
    .readMany({
      filter: {
        lisa_guide_locale_id: guideLocale.lisa_guide_locale_id,
      },
    })
    .then(completeDataList);

  const authors = await client
    .items(`lisa_author`)
    .readMany()
    .then(completeDataList);

  return {
    props: {
      localeId,

      guideLocaleVersion: {
        localeId,
        name: guideLocaleVersion.name,
        contentMarkdown: guideLocaleVersion.content_markdown,
      },
      guideLocaleAuthors: guideLocaleAuthors
        .sort((a, b) => (b?.rank ?? 0) - (a?.rank ?? 0))
        .map(({ lisa_author_id: authorId }) => {
          const {
            lisa_author_first_name: firstName,
            lisa_author_last_name: lastName,
          } = z
            .object({
              lisa_author_first_name: z.string(),
              lisa_author_last_name: z.string(),
            })
            .parse(
              authors.find((author) => author.lisa_author_id === authorId),
            );
          return { firstName, lastName };
        }),
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
export default DomainCategoryPage;
