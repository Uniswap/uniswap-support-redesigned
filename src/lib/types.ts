import { ColoredCardsIcon } from '../svgs/Icons';

export type Tag = {
  title: string;
  slug: string;
};

export type GlobalSettings = {
  navigationTopics: Tag[] | null;
  topNavigationApp: {
    id: string;
    key: string | ''; // Label of the link
    value: string | ''; // URL of the link
  } | null;
  footerLinksTopics:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerLinksEcosystem:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerLinksCompany:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerLinksHelp:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerGithubLink: string | null;
  footerXLink: string | null;
  footerDiscordLink: string | null;
  connectBlockTitle: string;
  connectBlockSupportTitle: string;
  connectBlockSupportButton: {
    id: string;
    key: string | ''; // Label of the link
    value: string | ''; // URL of the link
  };
  connectBlockSocialTitle: string;
  connectBlockSocialButton: {
    id: string;
    key: string | ''; // Label of the link
    value: string | ''; // URL of the link
  };
  connectBlockNewsletterTitle: string;
};

// export type CategoryJSON = {
//   created_at?: string;
//   description?: string;
//   html_url?: string;
//   id: number;
//   locale: string;
//   name: string;
//   outdated?: boolean;
//   position?: number;
//   source_locale?: string;
//   updated_at?: string;
//   url?: string;
// };

export type Badge = {
  id: string;
  name: string;
  description: string;
  category_slug: string;
  icon_url: string;
  assigned_at: string;
};

export type Organization = {
  id: string;
  name: string;
};

export type Author = {
  name: string;
  id: number;
  url: string;
  agent: boolean;
  avatar_url: string;
  badges: Badge[];
  organizations: Organization[];
};

export type PathStep = {
  name: string;
  url: string;
  target: string;
};

export type ArticleLabel = {
  identifier: string;
};

export type Article = {
  id: number;
  url: string;
  title: string;
  body: any;
  locale: string;
  promoted: boolean;
  internal: boolean;
  updated_at: string;
  created_at: string;
  edited_at: string;
  vote_sum: number;
  vote_count: number;
  upvote_count: number;
  comment_count: number;
  comments_disabled: boolean;
  author: Author;
  vote: () => any; // double check this.
  path_steps: PathStep[];
  labels: ArticleLabel[];
  snippet: string;
};

export type Section = {
  id: number;
  name: string;
  description: string;
  url: string;
  article_count: number;
  more_articles: boolean; //	If there are more articles than the ones in the articles array (the current page). Starting with Templating API v4, this property is not available in the Home page
  articles: Article[]; //	array	An array of up to 30 article objects. See more_articles above. For sections displayed on category pages, an array of up to 6 article objects. For subsections displayed on section pages, an array of up to 5 article objects. Starting with Templating API v4, this property is not available in the Home page
  more_sections: boolean; //	If there are more sections than the ones in the sections array
  sections: Section[]; //	array	An array of up to 30 section objects. See more_sections above. This array is populated only for Guide Enterprise customers. Starting with Templating API v4, the number of sections is limited to 5 on the Home page and the Category page
};

export type Category = {
  id: number;
  name: string;
  description: string;
  url: string;
  more_sections: boolean; //	If there are more sections than the ones in the sections array
  sections: Section[]; // An array of up to 5 category section objects
};

export interface Navigation {
  article_id: number;
  html_url: string;
  title: string;
  snippet: string;
}

export type Link = {
  name: string;
  url: string;
  target?: '_blank' | '_self';
};

export type FooterPageData = {
  footerGithubLink: string | null;
  footerXLink: string | null;
  footerDiscordLink: string | null;
  footerLinksSupport: Link[];
  footerLinksHelp: Link[];
  footerLinksCompany: Link[];
  footerLinksEcosystem: Link[];
};

export type ConnectBlock = {
  title: string;
  supportTitle: string;
  supportButton: Link;
  socialTitle: string;
  socialButton: Link;
  newsletterTitle: string;
};

export type ColoredCardsColor = 'pink' | 'green' | 'blue' | 'orange';

export type HomepageData = {
  heros: {
    headerLine1: string;
    headerLine2: string;
  }[];
  coloredCardsBlock: {
    cards: {
      icon: ColoredCardsIcon;
      title: string;
      description: string;
      color: ColoredCardsColor;
      url: string;
    }[];
  };
  faqBlock: {
    articles: {
      title: string;
      description: string;
      url: string;
    }[];
  };
  guidesBlock: {
    promotedArticles: Article[];
  };
  topicsBlock: {
    categories: Category[];
  };
  connectBlock: ConnectBlock;
};

export type ArticlePageData = {
  article: Article;
};

export type CategoryPageData = {
  category: Category;
};

export type SectionPageData = {
  section: Section;
};

export type NavCategory = {
  id: number;
  url: string;
  name: string;
  position: number;
  sections: {
    name: string;
    id: number;
    position: number;
    url: string;
    articles: {
      name: string;
      id: number;
      url: string;
      position: number;
    }[];
  }[];
};

export type SideNavData = {
  categories: NavCategory[];
} | null;

export type NavState = {
  category?: number;
  section?: number;
  article?: number;
};

export type SearchPageData = {
  query: string;
  results: SearchResult[];
  typeFilters: TypeFilter[];
  contentTagFilters: TypeFilter[];
};

export type SearchResult = {
  url: string;
  title: string;
  text: string;
  vote_sum: number;
  created_at: string;
  edited_at: string | null;
  comment_count: number;
  meta: string;
  type: string;
  path_steps: {
    url: string;
    name: string;
    target: string;
  }[];
  author: {
    name: string;
    url: string;
    agent: boolean;
    avatar_url: string;
    signed_in: boolean;
    id: number;
    role: string;
  };
  is_external: boolean;
};

type TypeFilter = {
  identifier: string;
  url: string;
  name: string;
  selected: boolean;
  label: string;
  count: number;
};
