import { createGlobalStyle } from "styled-components";
import { cabin } from "./lib/fonts";

export default createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root{
    --max-with: 1200px;
    --main-margin: 0 auto;
    --main-padding-mobile: 1em;
    --main-padding-desktop: 1em 2em;
    --hero-padding-desktop: 8em 2em;
    --primary-color: #59a2b7;
    --secondary-color: #f4b157;
    --primary-color-background: #eef1f3 ;
    --secondary-color-background: #fafafa;
    --primary-font: ${cabin.style.fontFamily};
  }

  body {
    font-family: var(--primary-font), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--primary-color-background);
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
  }

`;
