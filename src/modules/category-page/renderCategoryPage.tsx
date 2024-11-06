import { render } from "react-dom";
import { CategoryPageData } from "../../lib/types";
import { Settings } from "../shared";
import { createTheme, ThemeProviders } from "../shared";
import { CategoryBreadcrumbs } from "./CategoryPageModule";

export async function renderCategoryBreadcrumbs(
  settings: Settings,
  categoryPageData: CategoryPageData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <CategoryBreadcrumbs categoryPageData={categoryPageData} />
    </ThemeProviders>,
    container
  );
}
