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
import { completeDataList } from "@lisa-db/sdk/build/utils";
import { z } from "zod";

import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../components/Search/SearchBar";
import { DomainCategoryVersion } from "../../../lib/Models";
import { getLisaDbClientFromEnv } from "../../../lib/LisaDbClient";

type DomainCategoryPageStaticProps = {
  readonly domainCategoryLocaleVersion: DomainCategoryVersion;
};

const DomainCategoryPage: FunctionComponent<DomainCategoryPageStaticProps> = ({
  domainCategoryLocaleVersion: {
    name,
    localeId,
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
      <Flex justifyContent="center" height="100vh" paddingTop={10}>
        <Flex w="80%">
          <Box>
            <Flex>
              <Box>
                <Heading as="h2" size="lg" m="auto">
                  Domain Category (List of domains, grouped by domain category,
                  List of links)
                  {name},{localeId},{domainCategoryLocaleVersionId},
                  {contentMarkdown},
                </Heading>
              </Box>
            </Flex>
            <Flex>
              <UnorderedList>
                <ListItem>
                  <Link href="/en/domain-category/behavior">
                    <Text fontSize="3xl">Behavior</Text>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link href="/en/domain-category/cognition">
                    <Text fontSize="3xl">Cognition</Text>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link href="/en/domain-category/emotions">
                    <Text fontSize="3xl">Emotions</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/health">
                    <Text fontSize="3xl">Health</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/language">
                    <Text fontSize="3xl">Language</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/learning">
                    <Text fontSize="3xl">Learning</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/personal_and_personality">
                    <Text fontSize="3xl">Personal and personality</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/en/domain-category/Social_function">
                    <Text fontSize="3xl">Social function</Text>
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
export const getStaticProps: GetStaticProps<DomainCategoryPageStaticProps> =
  async ({ params }) => {
    const { localeId } = z
      .object({
        localeId: z.string(),
      })
      .parse(params);

    const client = await getLisaDbClientFromEnv();

    const [domainCategoryLocale] = await client
      .items(`lisa_domain_category_locale`)
      .readMany({
        filter: {
          locale_id: localeId,
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
