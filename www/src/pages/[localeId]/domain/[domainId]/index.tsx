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

import Footer from "../../../../components/Shell/Footer";
import TopBar from "../../../../components/Shell/TopBar/TopBar";
import { SideBar } from "../../../../components/Shell/SideBar/SideBar";
import { SearchBar } from "../../../../components/Search/SearchBar";
import { DomainLocaleVersion } from "../../../../lib/Models";
import { lorem } from "../../../../lib/MockData";
import { getLisaDbClientFromEnv } from "../../../../lib/LisaDbClient";
// import { Link } from "../../../../../../components/Routing/Link";

type DomainPageStaticProps = {
  readonly domainLocaleVersion: DomainLocaleVersion;
};

const DomainIdPage: FunctionComponent<DomainPageStaticProps> = ({
  domainLocaleVersion: { domainId, domainLocaleVersionId },

  domainLocaleVersion: { localeId },
  domainLocaleVersion: { name },
  domainLocaleVersion: { contentMarkdown },
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
                  Attention{` `}
                </Heading>
              </Flex>
            </Flex>
            <Flex>
              <Box>
                {` `}
                <Text justifyContent="center" align="justify" w="90%" ml={10}>
                  {` `}
                  {lorem(1500)}
                  {name},{localeId}, ,{contentMarkdown},{` `}
                  {domainId},{domainLocaleVersionId},
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

export const getStaticProps: GetStaticProps<DomainPageStaticProps> = async ({
  params,
}) => {
  const { localeId, domainId } = z
    .object({
      localeId: z.string(),

      domainId: z.string(),
    })
    .parse(params);

  const client = await getLisaDbClientFromEnv();

  const [domainLocale] = await client
    .items(`lisa_domain_locale`)
    .readMany({
      filter: {
        domain_id: domainId,
        locale_id: localeId,
      },
      limit: 1,
    })
    .then(completeDataList);

  const [
    {
      content_markdown: contentMarkdown,
      name,
      lisa_domain_locale_version_id: domainLocaleVersionId,
    },
  ] = await client
    .items(`lisa_domain_locale_version`)
    .readMany({
      filter: {
        lisa_domain_locale_id: domainLocale.lisa_domain_locale_id,
      },
    })
    .then(completeDataList)
    .then((domainLocaleVersions) =>
      domainLocaleVersions.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );

  return {
    props: {
      domainLocaleVersion: {
        contentMarkdown,

        domainLocaleVersionId,
        domainId,
        localeId,
        name,
      },
    },
  };
};

// http://localhost:4290/en/domain-category/cognition/domain/cognition-1
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
