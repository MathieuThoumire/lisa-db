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
import { LisaDbCollections } from "@lisa-db/sdk";

import Footer from "../../../../components/Shell/Footer";
import TopBar from "../../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../../components/Search/SearchBar";
import { getLisaDbClientFromEnv } from "../../../../lib/LisaDbClient";

type DomainIdPageStaticProps = {
  readonly localeId: string;
  readonly domains: Required<LisaDbCollections["lisa_domain"]>[];
  readonly domainLocales: Required<LisaDbCollections["lisa_domain_locale"]>[];
  readonly domainLocaleVersions: Required<
    LisaDbCollections["lisa_domain_locale_version"]
  >[];
  readonly domainCategories: Required<
    LisaDbCollections["lisa_domain_category"]
  >[];
  readonly domainCategoryLocales: Required<
    LisaDbCollections["lisa_domain_category_locale"]
  >[];
  readonly domainCategoryLocaleVersions: Required<
    LisaDbCollections["lisa_domain_category_locale_version"]
  >[];
};

const DomainIdPage: FunctionComponent<DomainIdPageStaticProps> = ({
  localeId,
  domains,
  domainLocales,
  domainLocaleVersions,
  domainCategories,
  domainCategoryLocales,
  domainCategoryLocaleVersions,
}) => {
  const domainLocaleVersion = domainLocaleVersions.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )[0];
  if (!domainLocaleVersion) {
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
                  {domainLocaleVersion.name}
                </Heading>
              </Flex>
            </Flex>
            <Flex>
              <Box>
                <Text justifyContent="center" align="justify" w="90%" ml={10}>
                  {domainLocaleVersion.content_markdown}
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
              {domainCategories.map((domainCategory) => {
                const domainCategoryLocale = domainCategoryLocales.find(
                  (domainCategoryLocale) =>
                    domainCategoryLocale.domain_category_id ===
                      domainCategory.domain_category_id &&
                    domainCategoryLocale.locale_id === localeId,
                );
                if (!domainCategoryLocale) {
                  return null;
                }
                const domainCategoryLocaleVersion = domainCategoryLocaleVersions
                  .filter(
                    (domainCategoryLocaleVersion) =>
                      domainCategoryLocaleVersion.lisa_domain_category_locale_id ===
                      domainCategoryLocale.lisa_domain_category_locale_id,
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime(),
                  )[0];
                if (!domainCategoryLocaleVersion) {
                  return null;
                }
                return (
                  <ListItem key={domainCategory.domain_category_id}>
                    <Link
                      href={`/${localeId}/domain-category/${domainCategory.domain_category_id}`}
                    >
                      {domainCategoryLocaleVersion.name}
                    </Link>
                    <UnorderedList>
                      {domains
                        .filter(
                          (domain) =>
                            domain.domain_category_id ===
                            domainCategory.domain_category_id,
                        )
                        .map((domain) => {
                          const domainLocale = domainLocales.find(
                            (domainLocale) =>
                              domainLocale.domain_id === domain.domain_id &&
                              domainLocale.locale_id === localeId,
                          );
                          if (!domainLocale) {
                            return null;
                          }
                          const domainLocaleVersion = domainLocaleVersions
                            .filter(
                              (domainLocaleVersion) =>
                                domainLocaleVersion.lisa_domain_locale_id ===
                                domainLocale.lisa_domain_locale_id,
                            )
                            .sort(
                              (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime(),
                            )[0];
                          if (!domainLocaleVersion) {
                            return null;
                          }
                          return (
                            <Flex flexDirection="column" key={domain.domain_id}>
                              <Link
                                href={`/${localeId}/domain/${domain.domain_id}`}
                              >
                                {domainLocaleVersion.name}
                              </Link>
                            </Flex>
                          );
                        })}
                    </UnorderedList>
                  </ListItem>
                );
              })}
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

export const getStaticProps: GetStaticProps<DomainIdPageStaticProps> = async ({
  params,
}) => {
  const { localeId, domainId } = z
    .object({
      localeId: z.string(),
      domainId: z.string(),
    })
    .parse(params);

  const client = await getLisaDbClientFromEnv();

  const domains = await client
    .items(`lisa_domain`)
    .readMany()
    .then(completeDataList);

  const domainLocales = await client
    .items(`lisa_domain_locale`)
    .readMany()
    .then(completeDataList);

  const domainLocaleVersions = await client
    .items(`lisa_domain_locale_version`)
    .readMany()
    .then(completeDataList);

  const domainCategories = await client
    .items(`lisa_domain_category`)
    .readMany()
    .then(completeDataList);

  const domainCategoryLocales = await client
    .items(`lisa_domain_category_locale`)
    .readMany()
    .then(completeDataList);

  const domainCategoryLocaleVersions = await client
    .items(`lisa_domain_category_locale_version`)
    .readMany()
    .then(completeDataList);

  return {
    props: {
      localeId,
      domains,
      domainLocales,
      domainLocaleVersions,
      domainCategories,
      domainCategoryLocales,
      domainCategoryLocaleVersions,
      domainId,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{
  readonly localeId: string;
  readonly domainId: string;
}> = async () => {
  const client = await getLisaDbClientFromEnv();

  const domainLocales = await client
    .items(`lisa_domain_locale`)
    .readMany()
    .then(completeDataList);

  return {
    paths: domainLocales.map(({ domain_id: domainId, locale_id: localeId }) => {
      return {
        params: {
          localeId: z.string().parse(localeId),
          domainId: z.string().parse(domainId),
        },
      };
    }),
    fallback: false,
  };
};

export default DomainIdPage;
