function Results({ hit, openFn }) {
  return (
    <div key={hit.id}>
      <img src={hit.webformatURL} onClick={() => openFn(hit)} />
      <span>
        {hit.tags.split(",").map((tag) => (
          <p>{tag}</p>
        ))}
      </span>
    </div>
  );
}

// <div key={hit.id}>
//   <img
//     src={hit.webformatURL}
//     onClick={() => openOverlay(hit)}
//   />
//   <span>
//     {hit.tags.split(",").map((tag) => (
//       <p>{tag}</p>
//     ))}
//   </span>
// </div>

export default Results;
