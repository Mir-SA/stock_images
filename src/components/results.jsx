import "./results.css";

function Results({ hit, openFn }) {
  return (
    <div key={hit.id}>
      <img src={hit.webformatURL} onClick={() => openFn(hit)} />
      <span>
        {hit.tags.split(",").map((tag, i) => (
          <p key={i}>{tag}</p>
        ))}
      </span>
    </div>
  );
}

export default Results;
