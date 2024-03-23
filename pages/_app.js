// import general things to run the app
import { SWRConfig } from "swr";
import useSWR from "swr";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
// import fontawesome icons
import GlobalStyle from "../styles";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// import components
import Layout from "@/components/Partials/Layout";
// import components for styles
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";

// global swr fetcher
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  //build a useState for the result of the Form
  const [formResults, setFormResults] = useState(0);
  const [randomSurprise, setRandomSurprise] = useState(0);
  const [isPageActive, setPageActive] = useState(false);

  const { data, error, isLoading } = useSWR("/api/places", fetcher);

  if (error)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>Failed to load...</h2>
      </StyledTertiarySection>
    );

  if (isLoading) {
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>loading...</h2>
      </StyledTertiarySection>
    );
  }

  if (!data) {
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>Data could not be loaded...</h2>
      </StyledTertiarySection>
    );
  }

  const places = data;

  //----------------------------------------------------------------

  // toogle the state for the active site, to see where you are
  const togglePageActive = () => {
    setPageActive(!isPageActive);
  };

  //----------------------------------------------------------------

  // Function to get unique values for a given key
  const getUniqueValues = (key) => {
    const uniqueValues = new Set();
    places.forEach((place) => {
      if (Array.isArray(place[key])) {
        place[key].forEach((value) => uniqueValues.add(value.activityname));
      } else {
        uniqueValues.add(place[key]);
      }
    });
    return Array.from(uniqueValues);
  };

  //----------------------------------------------------------------

  // handle the form results and set the state
  function handleResults(newResults) {
    setFormResults(newResults);
  }

  //----------------------------------------------------------------

  // give a random id for the surprise me card
  function handleSurprise() {
    const randomPlace = places[Math.floor(Math.random() * places.length)];
    setRandomSurprise(randomPlace);
  }

  //----------------------------------------------------------------

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <Layout togglePageActive={togglePageActive}>
            <Component
              formResults={formResults}
              setFormResults={setFormResults}
              handleResults={handleResults}
              getUniqueValues={getUniqueValues}
              places={places}
              randomSurprise={randomSurprise}
              setRandomSurprise={setRandomSurprise}
              handleSurprise={handleSurprise}
              {...pageProps}
            />
            <ScrollToTop smooth style={{ bottom: "120px" }} />
          </Layout>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
