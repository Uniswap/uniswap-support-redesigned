import { FC, useState } from 'react';
import { SideNavData, NavState, NavCategory } from '../../lib/types';
import cn from 'classnames';

type Props = {
  sideNavData: SideNavData;
  navState: NavState;
};

export const MobileMenuNav: FC<Props> = ({ sideNavData, navState }) => {
  const [selectedCategory, setSelectedCategory] = useState<NavCategory | null>(
    (sideNavData &&
      sideNavData.categories.find((category) =>
        category.sections.find((section) => section.id === navState.section)
      )) ||
      null
  );
  const [activeSection, setActiveSection] = useState<{ [key: number]: boolean }>({
    [navState.section || '']: true,
  });

  const handleSectiontoggle = (sectionId: number) => {
    setActiveSection((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (!sideNavData) {
    return null;
  }

  return (
    <>
      <div
        className={cn('w-full max-h-[60vh] h-full overflow-scroll', {
          hidden: !!selectedCategory,
        })}
      >
        {sideNavData.categories.map((category) => {
          const categoryIsActive = navState.category === category.id;

          return (
            <div key={category.id} className="mt-3 first:mt-0 w-full">
              <button
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'group w-full flex flex-row items-center justify-between transition subheading-1 hover:text-light-accent-1 dark:hover:text-dark-accent-1',
                  {
                    'text-light-accent-1 dark:text-dark-accent-1': categoryIsActive,
                    'text-light-neutral-1 dark:text-dark-neutral-1': !categoryIsActive,
                  }
                )}
              >
                <span>{category.name}</span>
                <ChevronRight />
              </button>
            </div>
          );
        })}
      </div>
      <div
        className={cn('w-full max-h-[60vh] h-full overflow-scroll', {
          hidden: !selectedCategory,
        })}
      >
        <div className="absolute -top-1 left-0">
          <button
            className="group flex flex-row items-center"
            onClick={() => setSelectedCategory(null)}
          >
            <ChevronLeft />
            <span className="ml-2 transition text-light-neutral-2 dark:text-dark-neutral-2 group-hover:text-light-neutral-1 group-hover:dark:text-dark-neutral-1">
              All Topics
            </span>
          </button>
        </div>
        <div>
          {selectedCategory && (
            <a href={selectedCategory.url}>
              <h3
                className={cn(
                  'transition subheading-1 my-3 hover:text-light-accent-1 hover:dark:text-dark-accent-1',
                  {
                    'text-light-accent-1 dark:text-dark-accent-1':
                      navState.category === selectedCategory.id,
                    'text-light-neutral-1 dark:text-dark-neutral-1':
                      navState.category !== selectedCategory.id,
                  }
                )}
              >
                {selectedCategory.name}
              </h3>
            </a>
          )}
          <ul className="accordion-body">
            {selectedCategory &&
              selectedCategory.sections.map((section) => {
                return (
                  <li key={section.id} className="mt-4 first:mt-5">
                    <button
                      className="w-full group flex flex-row items-center justify-between mt-6 first:mt-0"
                      onClick={() => handleSectiontoggle(section.id)}
                    >
                      <span
                        className={cn(
                          'transition body-2 group-hover:text-light-accent-1 dark:group-hover:text-dark-accent-1'
                        )}
                      >
                        {section.name}
                      </span>
                      <ChevronDown />
                    </button>
                    <ul
                      className={cn('accordion-body overflow-hidden', {
                        'accordion-body-active': activeSection[section.id],
                      })}
                    >
                      <div className="overflow-hidden">
                        {section.articles.map((article) => {
                          const isActiveArticle = navState.article === article.id;

                          return (
                            <li key={article.id} className="my-2">
                              <a
                                href={article.url}
                                className={cn(
                                  'transition body-2 hover:text-light-accent-1 dark:hover:text-dark-accent-1',
                                  {
                                    'text-light-accent-1 dark:text-dark-accent-1': isActiveArticle,
                                    'text-light-neutral-2 dark:text-dark-neutral-2':
                                      !isActiveArticle,
                                  }
                                )}
                              >
                                {article.name}
                              </a>
                            </li>
                          );
                        })}
                      </div>
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="my-margin-mobile border-t border-light-surface-3 dark:border-dark-surface-3" />
    </>
  );
};

const ChevronLeft: FC<{
  color?: 'neutral-2';
}> = ({ color = 'neutral-2' }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.4715 3.52827C10.7318 3.78862 10.7318 4.21073 10.4715 4.47108L6.94289 7.99967L10.4715 11.5283C10.7318 11.7886 10.7318 12.2107 10.4715 12.4711C10.2111 12.7314 9.78903 12.7314 9.52868 12.4711L5.52868 8.47108C5.26833 8.21073 5.26833 7.78862 5.52868 7.52827L9.52868 3.52827C9.78903 3.26792 10.2111 3.26792 10.4715 3.52827Z"
        className={cn({
          'transition fill-light-neutral-2 dark:fill-dark-neutral-2 group-hover:fill-light-neutral-1 group-hover:dark:fill-dark-neutral-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};

const ChevronRight: FC<{
  color?: 'neutral-2';
}> = ({ color = 'neutral-2' }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.52858 3.52827C5.26823 3.78862 5.26823 4.21073 5.52858 4.47108L9.05717 7.99967L5.52858 11.5283C5.26823 11.7886 5.26823 12.2107 5.52858 12.4711C5.78892 12.7314 6.21103 12.7314 6.47138 12.4711L10.4714 8.47108C10.7317 8.21073 10.7317 7.78862 10.4714 7.52827L6.47138 3.52827C6.21103 3.26792 5.78892 3.26792 5.52858 3.52827Z"
        className={cn({
          'transition fill-light-neutral-2 dark:fill-dark-neutral-2 group-hover:fill-light-accent-1 group-hover:dark:fill-dark-accent-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};

const ChevronDown: FC<{
  color?: 'neutral-2';
}> = ({ color = 'neutral-2' }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.52876 5.52827C3.78911 5.26792 4.21122 5.26792 4.47157 5.52827L8.00016 9.05687L11.5288 5.52827C11.7891 5.26792 12.2112 5.26792 12.4716 5.52827C12.7319 5.78862 12.7319 6.21073 12.4716 6.47108L8.47157 10.4711C8.21122 10.7314 7.78911 10.7314 7.52876 10.4711L3.52876 6.47108C3.26841 6.21073 3.26841 5.78862 3.52876 5.52827Z"
        className={cn({
          'transition fill-light-neutral-2 dark:fill-dark-neutral-2 group-hover:fill-light-accent-1 group-hover:dark:fill-dark-accent-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};
