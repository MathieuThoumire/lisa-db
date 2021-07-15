import React, { Fragment, FunctionComponent } from "react";
import { Flex, Heading, ListItem, Box, UnorderedList } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { z } from "zod";
import { completeDataList, LisaDbCollections } from "@lisa-db/sdk";

import Footer from "../../../components/Shell/Footer";
import TopBar from "../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../components/Search/SearchBar";
import { getLisaDbClientFromEnv } from "../../../lib/LisaDbClient";
import { Link } from "../../../components/Routing/Link";

type DomainCategoryPageStaticProps = {
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

const DomainCategoryPage: FunctionComponent<DomainCategoryPageStaticProps> = ({
  localeId,
  domainCategories,
  domainCategoryLocales,
  domainCategoryLocaleVersions,
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
                  DomainCategory ( all domainsCategory List of links)
                </Heading>
              </Box>
            </Flex>
            <Flex>
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
                  const domainCategoryLocaleVersion =
                    domainCategoryLocaleVersions
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

export const getStaticProps: GetStaticProps<DomainCategoryPageStaticProps> =
  async ({ params }) => {
    const { localeId } = z
      .object({
        localeId: z.string(),
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
