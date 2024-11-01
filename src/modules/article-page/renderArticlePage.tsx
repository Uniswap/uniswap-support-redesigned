import { render } from 'react-dom';
import { ArticlePageData } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import ArticlePage from './ArticlePageModule';

export async function renderArticlePage(
  settings: Settings,
  articlePageData: ArticlePageData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ArticlePage articlePageData={articlePageData} />
    </ThemeProviders>,
    container
  );
}
