import { render } from 'react-dom';
import { FooterPageData } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import Footer from './FooterModule';

export async function renderFooter(
  settings: Settings,
  footerPageData: FooterPageData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <Footer footerPageData={footerPageData} />
    </ThemeProviders>,
    container
  );
}
