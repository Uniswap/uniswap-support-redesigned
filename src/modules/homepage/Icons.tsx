import { FC } from "react";
import cn from "classnames";
import React from "react";

export const HelpCircle: FC<{
  className?: string;
  color?: "orange-vibrant" | "blue-vibrant" | "green-base" | "pink-vibrant";
}> = ({ className, color = "orange-vibrant" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12.02 17.5C11.468 17.5 11.0149 17.052 11.0149 16.5C11.0149 15.948 11.458 15.5 12.01 15.5H12.02C12.573 15.5 13.02 15.948 13.02 16.5C13.02 17.052 12.572 17.5 12.02 17.5ZM13.603 12.5281C12.872 13.0181 12.7359 13.291 12.7109 13.363C12.6059 13.676 12.314 13.874 12 13.874C11.921 13.874 11.841 13.862 11.762 13.835C11.369 13.703 11.1581 13.278 11.2891 12.885C11.4701 12.345 11.9391 11.836 12.7671 11.281C13.7881 10.597 13.657 9.84707 13.614 9.60107C13.501 8.94707 12.95 8.38988 12.303 8.27588C11.811 8.18588 11.3301 8.31488 10.9541 8.62988C10.5761 8.94688 10.3589 9.41391 10.3589 9.90991C10.3589 10.3239 10.0229 10.6599 9.60889 10.6599C9.19489 10.6599 8.85889 10.3239 8.85889 9.90991C8.85889 8.96891 9.27099 8.08396 9.98999 7.48096C10.702 6.88496 11.639 6.63605 12.564 6.80005C13.831 7.02405 14.8701 8.07097 15.0911 9.34497C15.3111 10.607 14.782 11.7381 13.603 12.5281Z"
        className={cn({
          "fill-light-orange-vibrant dark:fill-dark-orange-vibrant":
            color === "orange-vibrant",
          "fill-light-blue-vibrant dark:fill-dark-blue-vibrant":
            color === "blue-vibrant",
          "fill-light-green-base dark:fill-dark-green-base":
            color === "green-base",
          "fill-light-pink-vibrant dark:fill-dark-pink-vibrant":
            color === "pink-vibrant",
        })}
      />
    </svg>
  );
};

export const Lightbulb: FC<{
  className?: string;
  color?: "orange-vibrant" | "blue-vibrant" | "green-base" | "pink-vibrant";
}> = ({ className, color = "orange-vibrant" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 9.43997C18.03 11.4 17.0701 12.9201 15.8701 14.3101C15.3961 14.8651 14.9731 15.396 14.7271 16.052C14.6831 16.169 14.5769 16.25 14.4529 16.25H12.55C12.384 16.25 12.25 16.116 12.25 15.95V13.3101L14.03 11.5301C14.32 11.2401 14.32 10.76 14.03 10.47C13.74 10.18 13.26 10.18 12.97 10.47L11.5 11.94L10.03 10.47C9.74003 10.18 9.25997 10.18 8.96997 10.47C8.67997 10.76 8.67997 11.2401 8.96997 11.5301L10.75 13.3101V15.95C10.75 16.116 10.616 16.25 10.45 16.25H8.53491C8.41091 16.25 8.30596 16.17 8.26196 16.054C8.00696 15.386 7.57409 14.8451 7.09009 14.2801C6.00009 13.0001 5 11.39 5 9.50003C5 5.85003 8.00994 2.90003 11.6899 3.00003C15.1199 3.10003 17.94 6.01997 18 9.43997ZM14.2 17.75C14.082 17.75 8.91805 17.75 8.80005 17.75C8.50005 17.75 8.5 18 8.5 18C8.5 19 8.83988 19.75 9.37988 20.25C9.91988 20.75 10.67 21 11.5 21C12.33 21 13.0801 20.75 13.6201 20.25C14.1601 19.75 14.5 19 14.5 18C14.5 18 14.5 17.75 14.2 17.75Z"
        className={cn({
          "fill-light-orange-vibrant dark:fill-dark-orange-vibrant":
            color === "orange-vibrant",
          "fill-light-blue-vibrant dark:fill-dark-blue-vibrant":
            color === "blue-vibrant",
          "fill-light-green-base dark:fill-dark-green-base":
            color === "green-base",
          "fill-light-pink-vibrant dark:fill-dark-pink-vibrant":
            color === "pink-vibrant",
        })}
      />
    </svg>
  );
};

export const GraduationCap: FC<{
  className?: string;
  color?:
    | "orange-vibrant"
    | "blue-vibrant"
    | "green-base"
    | "pink-vibrant"
    | "neutral-1";
}> = ({ className, color = "orange-vibrant" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9995 14.4189V16.6999C17.9995 17.3939 17.6324 18.035 17.0454 18.406C13.6814 20.531 10.3164 20.531 6.95242 18.406C6.36542 18.036 5.99856 17.3939 5.99856 16.6999V14.4189C5.99856 14.3429 6.07951 14.295 6.14651 14.331L9.81863 16.3399C10.4786 16.6999 11.2386 16.89 11.9986 16.89C12.7586 16.89 13.5185 16.6999 14.1785 16.3399L17.8506 14.331C17.9186 14.294 17.9995 14.3429 17.9995 14.4189ZM19.9365 7.90499L13.4656 4.37399C12.5526 3.87599 11.4484 3.87599 10.5344 4.37399L4.0635 7.90499C2.6455 8.67799 2.6455 10.714 4.0635 11.488L10.5344 15.019C11.4474 15.517 12.5516 15.517 13.4656 15.019L19.9365 11.488L19.2495 11.863V16C19.2495 16.414 19.5855 16.75 19.9995 16.75C20.4135 16.75 20.7495 16.414 20.7495 16V10.671C21.2535 9.73899 20.9855 8.47699 19.9365 7.90499Z"
        className={cn({
          "fill-light-orange-vibrant dark:fill-dark-orange-vibrant":
            color === "orange-vibrant",
          "fill-light-blue-vibrant dark:fill-dark-blue-vibrant":
            color === "blue-vibrant",
          "fill-light-green-base dark:fill-dark-green-base":
            color === "green-base",
          "fill-light-pink-vibrant dark:fill-dark-pink-vibrant":
            color === "pink-vibrant",
          "fill-light-neutral-1 dark:fill-dark-neutral-1":
            color === "neutral-1",
        })}
      />
    </svg>
  );
};

export const BookOpen: FC<{
  className?: string;
  color?: "neutral-1";
}> = ({ className, color = "neutral-1" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 5.31967V18.3297C21 18.6597 20.6801 18.8898 20.3501 18.7998C17.9661 18.1208 15.573 18.1177 13.187 19.3077C12.986 19.4077 12.749 19.2717 12.749 19.0467V5.85276C12.749 5.78576 12.7701 5.71877 12.8091 5.66477C13.4321 4.80977 14.396 4.21471 15.519 4.07871C17.331 3.85871 19.0731 4.07879 20.7141 4.86179C20.8891 4.94479 21 5.12667 21 5.31967ZM8.47998 4.07968C6.66798 3.85968 4.92591 4.07976 3.28491 4.86276C3.11091 4.94576 3 5.12777 3 5.32077V18.3308C3 18.6608 3.3199 18.8908 3.6499 18.8008C6.0339 18.1218 8.42699 18.1187 10.813 19.3087C11.014 19.4087 11.251 19.2727 11.251 19.0477V5.85373C11.251 5.78673 11.2299 5.71974 11.1909 5.66574C10.5669 4.81074 9.60398 4.21568 8.47998 4.07968Z"
        className={cn({
          "fill-light-neutral-1 dark:fill-dark-neutral-1":
            color === "neutral-1",
        })}
      />
    </svg>
  );
};

export const Layers: FC<{
  className?: string;
  color?: "neutral-1";
}> = ({ className, color = "neutral-1" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.19 17.59L13.6 20.65C12.59 21.12 11.41 21.12 10.4 20.65L3.81 17.59C2.73 17.09 2.73 15.55 3.81 15.05L3.95001 14.99L9.76999 17.68C10.47 18.01 11.22 18.18 12 18.18C12.78 18.18 13.53 18.01 14.23 17.68L20.05 14.99L20.19 15.05C21.27 15.55 21.27 17.09 20.19 17.59ZM20.19 10.72L20.06 10.66L15.4 12.83L14.23 13.37C13.53 13.69 12.78 13.86 12 13.86C11.22 13.86 10.47 13.69 9.76999 13.37L8.60001 12.83L3.94 10.66L3.81 10.72C2.73 11.23 2.73 12.77 3.81 13.27L5.73001 14.16L10.4 16.32C10.91 16.56 11.45 16.68 12 16.68C12.55 16.68 13.09 16.56 13.6 16.32L18.27 14.16L20.19 13.27C21.27 12.77 21.27 11.23 20.19 10.72ZM20.19 6.41L13.6 3.35001C13.09 3.12001 12.55 3 12 3C11.45 3 10.91 3.12001 10.4 3.35001L3.81 6.41C2.73 6.91 2.73 8.45001 3.81 8.95001L3.94 9.01001L4.82999 9.42001L5.72 9.84L10.4 12.01C10.91 12.24 11.45 12.36 12 12.36C12.55 12.36 13.09 12.24 13.6 12.01L18.28 9.84L19.17 9.42001L20.06 9.01001L20.19 8.95001C21.27 8.45001 21.27 6.91 20.19 6.41Z"
        className={cn({
          "fill-light-neutral-1 dark:fill-dark-neutral-1":
            color === "neutral-1",
        })}
      />
    </svg>
  );
};

export const ArrowRight: FC<{
  className?: string;
  color?: "accent-1";
}> = ({ className, color = "accent-1" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.33325 14.0003C3.33325 13.5401 3.70635 13.167 4.16659 13.167L13.8214 13.167L9.41066 8.75625C9.08523 8.43081 9.08523 7.90317 9.41066 7.57774C9.7361 7.2523 10.2637 7.2523 10.5892 7.57774L16.4225 13.4111C16.7479 13.7365 16.7479 14.2641 16.4225 14.5896L10.5892 20.4229C10.2637 20.7484 9.7361 20.7484 9.41066 20.4229C9.08523 20.0975 9.08523 19.5698 9.41066 19.2444L13.8214 14.8337L4.16659 14.8337C3.70635 14.8337 3.33325 14.4606 3.33325 14.0003Z"
        className={cn({
          "fill-light-accent-1 dark:fill-dark-accent-1": color === "accent-1",
        })}
      />
    </svg>
  );
};

export const MessageQuestion: FC<{
  className?: string;
  color?: "orange-vibrant" | "blue-vibrant" | "green-base" | "pink-vibrant";
}> = ({ className, color = "orange-vibrant" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 3H6C4 3 3 4 3 6V21L6 18H18C20 18 21 17 21 15V6C21 4 20 3 18 3ZM12.02 15C11.468 15 11.0149 14.552 11.0149 14C11.0149 13.448 11.458 13 12.01 13H12.02C12.573 13 13.02 13.448 13.02 14C13.02 14.552 12.572 15 12.02 15ZM13.345 11.051C12.789 11.421 12.713 11.608 12.71 11.616C12.597 11.918 12.3051 12.1121 11.9971 12.1121C11.9151 12.1121 11.833 12.098 11.752 12.069C11.367 11.932 11.1581 11.523 11.2891 11.135C11.4921 10.535 12.0849 10.087 12.5149 9.802C13.1509 9.379 13.1579 8.95004 13.1079 8.66504C13.0299 8.22404 12.6529 7.84604 12.2109 7.76904C11.8749 7.70804 11.5381 7.79494 11.2781 8.01294C11.0221 8.22794 10.876 8.542 10.876 8.875C10.876 9.289 10.54 9.625 10.126 9.625C9.71198 9.625 9.37598 9.289 9.37598 8.875C9.37598 8.097 9.71796 7.36401 10.314 6.86401C10.91 6.36401 11.6939 6.15402 12.4709 6.29102C13.5299 6.47702 14.399 7.34603 14.585 8.40503C14.769 9.45803 14.329 10.397 13.345 11.051Z"
        className={cn({
          "fill-light-orange-vibrant dark:fill-dark-orange-vibrant":
            color === "orange-vibrant",
          "fill-light-blue-vibrant dark:fill-dark-blue-vibrant":
            color === "blue-vibrant",
          "fill-light-green-base dark:fill-dark-green-base":
            color === "green-base",
          "fill-light-pink-vibrant dark:fill-dark-pink-vibrant":
            color === "pink-vibrant",
        })}
      />
    </svg>
  );
};

export const Envlope: FC<{
  className?: string;
  color?: "pink-vibrant" | "neutral-2";
}> = ({ className, color = "pink-vibrant" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 5H6C4 5 3 6 3 8V17C3 19 4 20 6 20H18C20 20 21 19 21 17V8C21 6 20 5 18 5ZM17.9409 9.606L13.0291 13.178C12.7211 13.402 12.36 13.514 12 13.514C11.64 13.514 11.2779 13.402 10.9709 13.179L6.05908 9.606C5.72408 9.363 5.65004 8.893 5.89404 8.558C6.13704 8.224 6.60389 8.14801 6.94189 8.39301L11.854 11.965C11.942 12.028 12.059 12.029 12.147 11.965L17.0591 8.39301C17.3961 8.14801 17.8639 8.224 18.1069 8.558C18.3509 8.894 18.2759 9.363 17.9409 9.606Z"
        className={cn({
          "fill-light-pink-vibrant dark:fill-dark-pink-vibrant":
            color === "pink-vibrant",
          "fill-light-neutral-2 dark:fill-dark-neutral-2":
            color === "neutral-2",
        })}
      />
    </svg>
  );
};

export const Chat: FC<{
  className?: string;
  color?: "brown-vibrant";
}> = ({ className, color = "brown-vibrant" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8789 20.394C21.1189 20.594 20.9789 20.994 20.6689 20.994C19.6389 21.034 18.0591 20.894 17.0891 19.864C16.2991 20.144 15.419 20.2841 14.499 20.2841C12.481 20.2841 10.686 19.607 9.49902 18.368C9.31002 18.17 9.35802 17.785 9.79102 17.819C10.024 17.835 10.259 17.844 10.499 17.844C15.119 17.844 18.614 15.143 19.353 11.235C19.403 10.973 19.7291 10.886 19.8931 11.097C20.5931 12.003 20.998 13.1481 20.998 14.5031C20.998 16.0331 20.4679 17.314 19.5879 18.264C19.6989 18.964 20.0889 19.754 20.8789 20.394ZM17.998 9.67102C17.998 9.62402 17.992 9.58103 17.991 9.53503C17.917 5.44903 14.594 3 10.499 3C6.35802 3 3 5.50202 3 9.67102C3 11.439 3.608 12.915 4.625 14.015C4.5 14.816 4.05009 15.733 3.14209 16.467C2.86709 16.7 3.02503 17.159 3.38403 17.167C4.56703 17.209 6.39203 17.05 7.50903 15.858C7.73703 15.937 7.97094 16.006 8.21094 16.066C8.93194 16.247 9.69998 16.3409 10.501 16.3409C14.64 16.3419 17.998 13.84 17.998 9.67102Z"
        className={cn({
          "fill-light-brown-vibrant dark:fill-dark-brown-vibrant":
            color === "brown-vibrant",
        })}
      />
    </svg>
  );
};

export type ColoredCardsIcon =
  | "helpCircle"
  | "lightbulb"
  | "graduationCap"
  | "messageQuestion";
export type ColoredCardsIconColor =
  | "blue-vibrant"
  | "green-base"
  | "orange-vibrant"
  | "pink-vibrant";

export const ColoredCardsIconMap: FC<{
  icon: ColoredCardsIcon;
  className?: string;
  color?: ColoredCardsIconColor;
}> = ({ icon, color, className }) => {
  switch (icon) {
    case "helpCircle":
      return <HelpCircle color={color} className={className} />;
    case "lightbulb":
      return <Lightbulb color={color} className={className} />;
    case "graduationCap":
      return <GraduationCap color={color} className={className} />;
    case "messageQuestion":
      return <MessageQuestion color={color} className={className} />;
    default:
      console.warn(`Icon ${icon} not found`);
      return null;
  }
};
