import { FC, useRef, useEffect } from 'react';
import { SearchPageData } from '../../lib/types';
import { format } from 'date-fns';

type Props = {
  searchPageData: SearchPageData;
};

const parseTextWithEmphasis = (text: string): (string | JSX.Element)[] => {
  const parts = text.split(/(<em>.*?<\/em>)/g);
  return parts.map((part, index) =>
    part.startsWith('<em>') && part.endsWith('</em>') ? (
      <em key={index}>{part.slice(4, -5)}</em>
    ) : (
      part
    )
  );
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return format(date, 'MMMM dd, yyyy HH:mm');
};

const ChevronIcon: FC = () => (
  <svg
    className="mx-0.5 min-w-4 min-h-4"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.52827 3.52827C5.26792 3.78862 5.26792 4.21073 5.52827 4.47108L9.05687 7.99967L5.52827 11.5283C5.26792 11.7886 5.26792 12.2107 5.52827 12.4711C5.78862 12.7314 6.21073 12.7314 6.47108 12.4711L10.4711 8.47108C10.7314 8.21073 10.7314 7.78862 10.4711 7.52827L6.47108 3.52827C6.21073 3.26792 5.78862 3.26792 5.52827 3.52827Z"
      className="fill-light-neutral-2 dark:fill-dark-neutral-2"
    />
  </svg>
);

const Breadcrumbs: FC<{ pathSteps: { url: string; name: string; target: string }[] }> = ({
  pathSteps,
}) => (
  <ol className="breadcrumbs search-result-breadcrumbs flex flex-row items-center flex-wrap">
    {pathSteps.map((step, index) => (
      <li
        key={index}
        className="flex flex-row items-center body-3 text-light-neutral-2 dark:text-dark-neutral-2 hover:text-light-neutral-1 hover:dark:text-dark-neutral-1 shrink-0"
      >
        <a href={step.url} target={step.target}>
          {step.name}
        </a>
        {index < pathSteps.length - 1 && <ChevronIcon />}
      </li>
    ))}
  </ol>
);

const TypeFilterList: FC<{
  typeFilters: {
    identifier: string;
    url: string;
    name: string;
    selected: boolean;
    count: number;
  }[];
}> = ({ typeFilters }) => (
  <ul className="multibrand-filter-list multibrand-filter-list--collapsed">
    {typeFilters.map((filter) => (
      <li key={filter.identifier}>
        <a
          href={filter.url}
          className={`sidenav-item ${filter.selected ? 'current' : ''}`}
          aria-current={filter.selected ? 'page' : undefined}
        >
          <span className="sidenav-subitem filter-name">{filter.name}</span>
          <span className="sidenav-subitem doc-count ml-0.5">({filter.count})</span>
        </a>
      </li>
    ))}
  </ul>
);

export const SearchResultPageModule: FC<Props> = ({ searchPageData }) => {
  const { query, results, typeFilters } = searchPageData;
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const searchBarPlaceholder = document.getElementById('search-bar-search-result');
      if (searchBarPlaceholder && searchBarRef.current) {
        searchBarRef.current.appendChild(searchBarPlaceholder);
        searchBarPlaceholder.style.opacity = '1';
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  if (!query) return null;

  return (
    <div>
      <div className="search-results flex flex-row text-light-neutral-1 dark:text-light-neutral-1 !bg-light-surface-1 dark:!bg-dark-surface-1">
        <div className="min-w-[15rem] max-w-[15rem] mt-nav-h hidden md:block !bg-light-surface-1 dark:!bg-dark-surface-1">
          <aside className="search-results-sidebar mt-[1.5rem] px-[1.63rem]">
            {typeFilters && (
              <section className="filters-in-section">
                <h3 className="collapsible-sidebar-title sidenav-title heading-2 text-light-neutral-1 dark:text-dark-neutral-1">
                  Type
                </h3>
                <TypeFilterList typeFilters={typeFilters} />
              </section>
            )}
          </aside>
        </div>
        <div className="page-wrapper">
          <section id="main-content" className="search-results-column">
            <Breadcrumbs
              pathSteps={[
                { url: '/', name: 'Home', target: '_self' },
                { url: '#', name: 'Search results', target: '_self' },
              ]}
            />
            <h1 className="search-results-subheading heading-2 text-light-neutral-1 dark:text-dark-neutral-1 mt-[1.92rem]">
              {results ? (
                <>
                  {results.length} results for "{query}"
                </>
              ) : (
                <div className="no-results">
                  <div className="headline heading-2 text-light-neutral-1 dark:text-dark-neutral-1">
                    No result for {query}
                  </div>
                </div>
              )}
            </h1>
            <div ref={searchBarRef} />
            {results ? (
              <ul className="search-results-list">
                {results.map((result) => (
                  <li key={result.url}>
                    <article className="flex flex-col space-y-[0.62rem]">
                      <header className="flex flex-col space-y-[0.62rem]">
                        <h2 className="search-result-title heading-3 text-light-neutral-1 dark:text-dark-neutral-1 hover:text-light-neutral-2 hover:dark:text-dark-neutral-2">
                          <a href={result.url}>{result.title}</a>
                        </h2>
                        <Breadcrumbs pathSteps={result.path_steps} />
                      </header>
                      <p className="search-result-description body-2 dark:text-dark-neutral-1 text-light-neutral-1">
                        {parseTextWithEmphasis(result.text)}
                      </p>
                      <span className="meta-data body-2 text-light-neutral-2 dark:text-dark-neutral-2 italic">
                        {formatDate(result.created_at)}
                      </span>
                    </article>
                    <div className="h-px bg-light-surface-3 dark:bg-dark-surface-3 w-full my-[1.94rem]" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-results">
                <div className="action-prompt">
                  <a
                    className="transition hover:text-light-pink-vibrant dark:hover:text-dark-pink-vibrant hover:bg-light-accent-2 hover:dark:bg-dark-accent-2 mr-4 mb-3 block rounded-medium py-margin-mobile-dense px-margin-extension text-light-neutral-1 dark:text-dark-neutral-1 bg-light-surface-2 dark:bg-dark-surface-2 w-fit"
                    href="/"
                    aria-label="go back to homepage"
                  >
                    Go back to homepage
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
