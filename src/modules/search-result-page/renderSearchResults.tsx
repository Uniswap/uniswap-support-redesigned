import { render } from 'react-dom';
import { SearchPageData } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import { SearchResultPageModule } from './SearchResultPageModule';

export async function renderSearchResults(
  settings: Settings,
  searchData: SearchPageData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <SearchResultPageModule searchPageData={searchData} />
    </ThemeProviders>,
    container
  );
}
