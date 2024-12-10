import { Article } from '../../lib/types';
import { FAQDataManager } from '../../utils/localStorage';

export const fetchFAQArticles = async (): Promise<Article[] | null> => {
  const API_URL = 'https://support.uniswap.org/api/v2/help_center/articles/search?label_names=faq';

  const cachedFAQData = FAQDataManager.get();

  if (cachedFAQData && cachedFAQData.expiresAt > Date.now()) {
    console.log('Returning cached FAQ articles');
    return cachedFAQData.data;
  }

  FAQDataManager.clear();

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

    // Store fetched data with a 24-hour expiration
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    FAQDataManager.set({
      expiresAt: Date.now() + oneDayInMilliseconds,
      data: articles,
    });

    return articles;
  } catch (error) {
    console.error('Error fetching FAQ articles:', error);
    return null;
  }
};
