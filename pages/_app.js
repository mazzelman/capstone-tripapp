import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { useState } from "react";

//import fake DB from @/lib/db
import { dbPlaces as places } from "@/lib/db";

export default function App({ Component, pageProps }) {
  //build a useState for the result of the Form
  const [formResults, setFormResults] = useState(0);
  const [randomSurprise, setRandomSurprise] = useState(0);
  const [isPageActive, setPageActive] = useState(false);

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
        place[key].forEach((value) => uniqueValues.add(value));
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
      </Layout>
    </>
  );
}
