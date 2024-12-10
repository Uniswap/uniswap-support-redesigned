import { Article } from '../../lib/types';

export const fetchFAQArticles = async (): Promise<Article[] | null> => {
  const API_URL = 'https://support.uniswap.org/api/v2/help_center/articles/search?label_names=faq';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQ articles: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results) {
      console.warn('No FAQ articles found in the response.');
      return [];
    }

    const articles: Article[] = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      url: item.html_url,
      snippet: item.snippet,
    }));

    return articles;
  } catch (error) {
    console.error('Error fetching FAQ articles:', error);
    return null;
  }
};
