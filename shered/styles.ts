import { css } from "styled-components";
import Color from "color";

export const color = {
  primary: "#e95a33",
};

export const mixin = {
  center: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  darken: (colorValue: string, amount: number) =>
    Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) =>
    Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) =>
    Color(colorValue).alpha(opacity).string(),
  placeholderColor: (colorValue: string) => css`
    ::-webkit-input-placeholder {
      color: ${colorValue} !important;
      opacity: 0.9 !important;
    }
    :-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 0.9 !important;
    }
    ::-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 0.9 !important;
    }
    :-ms-input-placeholder {
      color: ${colorValue} !important;
      opacity: 0.9 !important;
    }
  `,
};
