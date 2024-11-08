import { render } from 'react-dom';
import { SideNavData, NavState } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import { SideNav } from './SideNavModule';
import { MobileMenuNav } from './MobileMenuNavModule';

export async function renderSideNav(
  settings: Settings,
  sideNavData: SideNavData,
  navState: NavState,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <SideNav sideNavData={sideNavData} navState={navState} />
    </ThemeProviders>,
    container
  );
}

export async function renderMobileMenuNav(
  settings: Settings,
  sideNavData: SideNavData,
  navState: NavState,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <MobileMenuNav sideNavData={sideNavData} navState={navState} />
    </ThemeProviders>,
    container
  );
}
