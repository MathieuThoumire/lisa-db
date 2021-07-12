export type Guide = {
  readonly guideId: string;
  readonly domainCategoryId: string;
  readonly domainId: string;
};

export type GuideLocaleVersion = {
  readonly guideId: string;
  readonly localeId: string;
  readonly name: string;
  readonly contentMarkdown: string;
};
export type GuideVersion = {
  readonly localeId: string;
  readonly name: string;
  readonly contentMarkdown: string;
};
export type GuideLocaleAuthor = {
  readonly firstName: string;
  readonly lastName: string;
};

export type Domain = {
  readonly domainId: string;
  readonly domainCategoryId: string;
};
export type DomainLocaleVersion = {
  readonly domainLocaleVersionId: string;
  readonly domainId: string;
  readonly localeId: string;
  readonly name: string;
  readonly contentMarkdown: string;
};
export type DomainLocale = {
  readonly domainLocaleVersionId: string;
  readonly localeId: string;
  readonly name: string;
  readonly contentMarkdown: string;
};
export type DomainCategoryLocaleVersion = {
  readonly domainCategoryId: string;
  readonly localeId: string;
  readonly domainCategoryLocaleVersionId: string;
  readonly name: string;
  readonly contentMarkdown: string;
};
export type DomainCategoryVersion = {
  readonly localeId: string;
  readonly domainCategoryLocaleVersionId: string;
  readonly name: string;
  readonly contentMarkdown: string;
};
export type GuideIdLocaleVersion = {
  readonly localeId: string;
  readonly guideId: string;
};
