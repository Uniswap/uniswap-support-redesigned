import { render } from 'react-dom';
import { SideNavData } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import { SideNav } from './SideNavModule';

export async function renderSideNav(
  settings: Settings,
  sideNavData: SideNavData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <SideNav sideNavData={sideNavData} />
    </ThemeProviders>,
    container
  );
}
