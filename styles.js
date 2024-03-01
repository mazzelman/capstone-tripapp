import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root{
    --max-with: 800px;
    --main-margin: 0 auto;
    --main-padding: 1em;

  }

  body {    
    margin: 0;
    font-family: system-ui;
  }
`;
