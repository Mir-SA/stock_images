import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search({ searchTerms, fetchData }) {
  return (
    <>
      <div className="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#fff" }} />
        <div className="line"></div>
        <input type="text" onChange={searchTerms} placeholder="search" />
        <button onClick={fetchData}>GO!</button>
      </div>
    </>
  );
}

export default Search;
