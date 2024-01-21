import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/header";
import Search from "./components/search";
import Results from "./components/results";
import Overlay from "./components/overlay";

import "./App.css";

function App() {
  const [search, setSearch] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  function searchTerms(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  async function fetchData() {
    setLoading(true);

    try {
      await fetch(
        `https://pixabay.com/api/?key=41874052-70aa8d28559707f18eeb267a3&q=${search}&image_type=photo`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openOverlay(img) {
    console.log(img);
    setSelectedImg(img);
  }

  const closeOverlay = () => {
    setSelectedImg(null);
  };
  console.log(loading);
  return (
    <>
      <Header />
      {searchResults ? (
        <>
          {loading ? (
            <div className="loader">{console.log(loading)}</div>
          ) : (
            <>
              <Search searchTerms={searchTerms} fetchData={fetchData} />
              {searchResults.totalHits !== 0 ? (
                <>
                  <h2 className="resultText">Results: {search}</h2>
                  <div className="related">
                    {searchResults.hits.slice(0, 2).map((hit) => {
                      {
                        return hit.tags.split(",").map((tag) => <p>{tag}</p>);
                      }
                    })}
                  </div>
                  <section className="results">
                    {searchResults.hits.slice(0, 6).map((hit) => {
                      return <Results hit={hit} openFn={openOverlay} />;
                    })}
                  </section>

                  {selectedImg && (
                    <Overlay
                      selectedImg={selectedImg}
                      closeOverlay={closeOverlay}
                    />
                  )}
                </>
              ) : (
                <>
                  <div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                      width={"240"}
                      className="errorRes"
                    />
                    <h2 className="errorRes">No Results</h2>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <h1 className="landing_txt">
            Discover over 2,000,000 free Stock Images
          </h1>
          <Search searchTerms={searchTerms} fetchData={fetchData} />
          <div className="trending">
            <p>
              <b>Trending:</b> forest, love, river, flowers
            </p>
          </div>
          {/* <div className="loader">{console.log(loading)}</div> */}
        </>
      )}
    </>
  );
}

export default App;
