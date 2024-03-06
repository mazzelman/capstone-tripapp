import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { useState } from "react";

//import fake DB from @/lib/db
import { dbPlaces } from "@/lib/db";
const places = dbPlaces;

export default function App({ Component, pageProps }) {
  //build a useState for the result of the Form
  const [formResults, setFormResults] = useState(0);
  const [randomSurprise, setRandomSurprise] = useState(0);

  // Function to get unique values for a given key
  const getUniqueValues = (key) => {
    const uniqueValues = new Set();
    dbPlaces.forEach((place) => {
      if (Array.isArray(place[key])) {
        place[key].forEach((value) => uniqueValues.add(value));
      } else {
        uniqueValues.add(place[key]);
      }
    });
    return Array.from(uniqueValues);
  };

  // handle the form results and set the state
  function handleResults(newResults) {
    setFormResults(newResults);
  }

  // give a random id for the surprise me card
  function handleSurprise() {
    const randomPlace = places[Math.floor(Math.random() * places.length)];
    setRandomSurprise(randomPlace);
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
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
