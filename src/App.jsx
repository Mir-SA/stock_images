import { useState } from "react";
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
  const [selectedSize, setSelectedSize] = useState(null);

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
    setSelectedImg(img);
  }

  const closeOverlay = () => {
    setSelectedImg(null);
  };

  const handleDownload = async () => {
    const url = selectedImg[selectedSize]; // Get the URL for the selected size
    try {
      const response = await fetch(url);
      const blob = await response.blob(); // Create a blob from the response
      const downloadUrl = window.URL.createObjectURL(blob); // Create an object URL from the blob
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `image-${selectedSize}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl); // Clean up the object URL
    } catch (error) {
      console.error("Error during download", error);
    }
  };

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
                        return hit.tags.split(",").map((tag) => (
                          <p
                            onClick={() => {
                              setSearch(tag);
                              fetchData();
                            }}
                          >
                            {tag}
                          </p>
                        ));
                      }
                    })}
                  </div>
                  <section className="results">
                    {searchResults.hits.slice(0, 6).map((hit, i) => {
                      return <Results hit={hit} openFn={openOverlay} key={i} />;
                    })}
                  </section>

                  {selectedImg && (
                    <Overlay
                      selectedImg={selectedImg}
                      closeOverlay={closeOverlay}
                      setSize={setSelectedSize}
                      handleDownload={handleDownload}
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
        </>
      )}
    </>
  );
}

export default App;
