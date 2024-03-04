import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { useState } from "react";

//import fake DB from @/lib/db
import { dbPlaces } from "@/lib/db";
const places = dbPlaces;

export default function App({ Component, pageProps }) {
  //build a useState for the result of the Form
  const [formResults, setFormResults] = useState(0);

  // Function to get unique values of the 'activity' key
  const getUniqueActivities = () => {
    const uniqueActivities = new Set();
    dbPlaces.forEach((place) => uniqueActivities.add(place.activity));
    return Array.from(uniqueActivities);
  };

  function handleResults(newResults) {
    setFormResults(newResults);
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component
          formResults={formResults}
          setFormResults={setFormResults}
          handleResults={handleResults}
          getUniqueActivities={getUniqueActivities}
          places={places}
          {...pageProps}
        />
      </Layout>
    </>
  );
}
