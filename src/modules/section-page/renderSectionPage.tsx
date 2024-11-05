import { render } from 'react-dom';
import { SectionPageData } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import { SectionBreadcrumbs } from './SectionPageModule';

export async function renderSectionBreadcrumbs(
  settings: Settings,
  sectionPageData: SectionPageData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <SectionBreadcrumbs sectionPageData={sectionPageData} />
    </ThemeProviders>,
    container
  );
}
