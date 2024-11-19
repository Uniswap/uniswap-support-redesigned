import { Anchor } from '@zendeskgarden/react-buttons';
import { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import type { Field } from '../data-types';
import { Hint, Label } from '@zendeskgarden/react-forms';
import { Span } from '@zendeskgarden/react-typography';

interface MultiSelectProps {
  field: Field;
}

const slideIn = keyframes`
  from {
    grid-template-rows: 0fr;
  }
  to {
    grid-template-rows: 1fr;
  }
`;

const Container = styled.div`
  display: grid;
  animation: ${slideIn} 200ms forwards;
`;

const InnerContainer = styled.div`
  overflow: hidden;
`;

const ListItem = styled.li`
  margin: ${(props) => props.theme.space.sm} 0;
`;

export function RelatedArticles({ field }: MultiSelectProps): JSX.Element | null {
  const { options, required, description } = field;

  return options.length > 0 ? (
    <Container data-test-id="suggested-articles" className="!mt-6">
      <InnerContainer>
        <Label className="custom-title">
          <span>Related Articles</span>
          {required && <Span aria-hidden="true">*</Span>}
        </Label>
        {description && (
          <Hint className="custom-hint" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="sm:grid grid-cols-3 gap-4 mt-3 flex flex-row flex-nowrap overflow-x-scroll sm:overflow-x-hidden">
          {options.map((option, index) => {
            if (index <= 2) {
              return (
                <ListItem
                  key={option.value}
                  className="col-span-1 !min-h-[7.5rem] list-none !rounded-[1.25rem] w-3/4 shrink-0 sm:w-full"
                >
                  <Anchor href={option.value} className="hover:!no-underline" target="_blank">
                    <div className="col-span-1 !bg-light-accent-2 dark:!bg-dark-accent-2 hover:!bg-light-accent-2-hovered hover:dark:!bg-dark-accent-2-hovered !body-2 !text-light-accent-1 hover:!text-light-accent-1-hovered hover:dark:!text-dark-accent-1-hovered dark:!text-dark-accent-1 !min-h-[7.5rem] list-none !p-4 !rounded-[1.25rem] flex flex-col justify-between hover:!no-underline">
                      <Book />
                      <p>{option.name}</p>
                    </div>
                  </Anchor>
                </ListItem>
              );
            } else {
              return null;
            }
          })}
        </div>
      </InnerContainer>
    </Container>
  ) : null;
}

const Book: FC = () => {
  return (
    <svg
      className="mx-0.5 min-w-4 min-h-4"
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M21.334 5.31967V18.3297C21.334 18.6597 21.0141 18.8898 20.6841 18.7998C18.3001 18.1208 15.907 18.1177 13.521 19.3077C13.32 19.4077 13.083 19.2717 13.083 19.0467V5.85276C13.083 5.78576 13.1041 5.71877 13.1431 5.66477C13.7661 4.80977 14.73 4.21471 15.853 4.07871C17.665 3.85871 19.4071 4.07879 21.0481 4.86179C21.2231 4.94479 21.334 5.12667 21.334 5.31967ZM8.81396 4.07968C7.00196 3.85968 5.2599 4.07976 3.6189 4.86276C3.4449 4.94576 3.33398 5.12777 3.33398 5.32077V18.3308C3.33398 18.6608 3.65389 18.8908 3.98389 18.8008C6.36789 18.1218 8.76097 18.1187 11.147 19.3087C11.348 19.4087 11.585 19.2727 11.585 19.0477V5.85373C11.585 5.78673 11.5639 5.71974 11.5249 5.66574C10.9009 4.81074 9.93796 4.21568 8.81396 4.07968Z"
        className="fill-light-accent-1 dark:fill-dark-accent-1"
      />
    </svg>
  );
};
