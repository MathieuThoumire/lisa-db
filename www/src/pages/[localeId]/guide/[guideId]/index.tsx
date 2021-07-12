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

import { GuideLocaleVersion, GuideLocaleAuthor } from "../../../../lib/Models";
import { SideBar } from "../../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../../components/Search/SearchBar";
import Footer from "../../../../components/Shell/Footer";
import TopBar from "../../../../components/Shell/TopBar/TopBar";
import { getLisaDbClientFromEnv } from "../../../../lib/LisaDbClient";
import { lorem } from "../../../../lib/MockData";

type GuideIdPageStaticProps = {
  readonly localeId: string;
  readonly guideId: string;
  readonly guideLocaleVersion: GuideLocaleVersion;
  readonly guideLocaleAuthors: GuideLocaleAuthor[];
};

const GuidePage: FunctionComponent<GuideIdPageStaticProps> = () => {
  return (
    <Fragment>
      <TopBar />

      <Flex paddingTop={100} w="80%" m="auto">
        <SearchBar />
      </Flex>
      <Flex justifyContent="center" align="center">
        <Box w="80%">
          <Box>
            {/* <Link
            href={{
              pathname: `/[localeId]/domain-category/[domainCategoryId]`,
              query: {
                localeId: props.localeId,
                domainCategoryId: props.domainCategoryId,
              },
            }}
          >
            {props.domainCategoryId}
          </Link> */}
            <Flex justifyContent="space-between">
              <Flex>
                <Heading as="h2" size="lg" w="100%" m="auto" padding={10}>
                  Cognition-attention {` `}
                </Heading>
              </Flex>
            </Flex>
            <Flex>
              <Box>
                {` `}
                <Text justifyContent="center" align="justify" w="90%" ml={10}>
                  {` `}
                  {lorem(1500)}
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
            <UnorderedList>
              <ListItem>
                <Link href="/en/domain/emotion">emotions</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain/apprentissage">apprentissage</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain/cognition">cognition</Link>
              </ListItem>
              <ListItem>
                <Link href="/en/domain/learning">learning</Link>
              </ListItem>
            </UnorderedList>
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

  const [guideLocale] = await client
    .items(`lisa_guide_locale`)
    .readMany({
      filter: {
        lisa_guide_id: guideId,
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
      guideId,
      guideLocaleVersion: {
        guideId,
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
  readonly guideId: string;
  readonly localeId: string;
}> = async () => {
  const client = await getLisaDbClientFromEnv();
  const guide = await client
    .items(`lisa_guide_locale`)
    .readMany()
    .then(completeDataList);

  return {
    paths: guide.flatMap(({ lisa_guide_id: guideId, locale_id: localeId }) => ({
      params: {
        guideId: z.string().parse(guideId),
        localeId: z.string().parse(localeId),
      },
    })),
    fallback: false,
  };
};

export default GuidePage;
