import { GetStaticProps, GetStaticPaths } from "next";
import React, { FunctionComponent, Fragment } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
  Divider,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";
import { completeDataList } from "@lisa-db/sdk/build/utils";
import { z } from "zod";

import { DomainCategoryLocaleVersion } from "../../../../lib/Models";
import Footer from "../../../../components/Shell/Footer";
import TopBar from "../../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../../components/Search/SearchBar";
import { getLisaDbClientFromEnv } from "../../../../lib/LisaDbClient";

type DomainCategoryIdPageStaticProps = {
  readonly domainCategoryLocaleVersion: DomainCategoryLocaleVersion;
};

const DomainCategoryPage: FunctionComponent<DomainCategoryIdPageStaticProps> =
  ({
    domainCategoryLocaleVersion: {
      name,
      localeId,
      domainCategoryId,
      domainCategoryLocaleVersionId,
      contentMarkdown,
    },
  }) => {
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
                    Cognition{` `}
                  </Heading>
                </Flex>
              </Flex>
              <Flex>
                <Box>
                  {` `}
                  <Text justifyContent="center" align="justify" w="90%" ml={10}>
                    {` `}
                    {name},{localeId},{domainCategoryId},
                    {domainCategoryLocaleVersionId},{contentMarkdown},
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
                  <Link href="/en/domain-category/emotion">emotions</Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/learning">learning</Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/comportement">
                    comportement
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/learning">learning</Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/Apprentisage">
                    Apprentisage
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
            <Box w="80%" m="auto" p="1">
              <Divider />
            </Box>
          </Box>
          <Box>
            <SideBar />
          </Box>
        </Flex>
        <Footer />
      </Fragment>
    );
  };

export const getStaticProps: GetStaticProps<DomainCategoryIdPageStaticProps> =
  async ({ params }) => {
    const { localeId, domainCategoryId } = z
      .object({
        localeId: z.string(),
        domainCategoryId: z.string(),
      })
      .parse(params);

    const client = await getLisaDbClientFromEnv();

    const [domainCategoryLocale] = await client
      .items(`lisa_domain_category_locale`)
      .readMany({
        filter: {
          locale_id: localeId,
          domain_category_id: domainCategoryId,
        },
        limit: 1,
      })
      .then(completeDataList);

    const [
      {
        content_markdown: contentMarkdown,
        name,
        lisa_domain_category_locale_version_id: domainCategoryLocaleVersionId,
      },
    ] = await client
      .items(`lisa_domain_category_locale_version`)
      .readMany({
        filter: {
          lisa_domain_category_locale_id:
            domainCategoryLocale.lisa_domain_category_locale_id,
        },
      })
      .then(completeDataList)
      .then((domainCategoryLocaleVersions) =>
        domainCategoryLocaleVersions.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
      );

    return {
      props: {
        domainCategoryLocaleVersion: {
          domainCategoryId,
          localeId,
          contentMarkdown,
          domainCategoryLocaleVersionId,
          name,
        },
      },
    };
  };

export const getStaticPaths: GetStaticPaths<{
  readonly localeId: string;
  readonly domainCategoryId: string;
}> = async () => {
  const client = await getLisaDbClientFromEnv();
  const domainDomainCategoryLocales = await client
    .items(`lisa_domain_category_locale`)
    .readMany()
    .then(completeDataList);

  return {
    paths: domainDomainCategoryLocales.flatMap(
      ({ domain_category_id: domainCategoryId, locale_id: localeId }) => ({
        params: {
          domainCategoryId: z.string().parse(domainCategoryId),
          localeId: z.string().parse(localeId),
        },
      }),
    ),
    fallback: false,
  };
};

export default DomainCategoryPage;
