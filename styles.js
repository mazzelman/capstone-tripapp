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
    --main-margin-s-mobile: 1em;
    --main-margin-s-desktop: 1em 2em;
    --main-margin-m-desktop: 2em;
    --main-margin-l-desktop: 4em 2em;
    --main-margin-xl-desktop: 8em 2em;
    --main-padding: 1em;
    --main-padding-input: 0.5em;
    --main-padding-mobile: 1em;
    --main-padding-desktop: 1em 2em;
    --main-padding-xl-desktop: 2em 8em;
    --hero-padding-desktop: 8em 2em;
    --text-color: #171A21;
    --primary-color: #59a2b7;
    --secondary-color: #f4b157;
    --delete-color: #ff5a5f;
    --primary-color-background: #eef1f3 ;
    --secondary-color-background: #fafafa;
    --primary-disabled-color: #afb8c6;
    --primary-font: ${cabin.style.fontFamily};
    --border-radius: 0.3em;
  }

  body {
    font-family: var(--primary-font), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--text-color);
    background-color: var(--primary-color-background);
    margin: 0;
    @media only screen and (max-width: 1280px) {
    margin-bottom: 12em;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
    margin-top: 0;
  }

  a {
  color: var(--primary-color);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    }
  }

  input, textarea, button, select {
  padding: var(--main-padding-input);
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
}


`;
