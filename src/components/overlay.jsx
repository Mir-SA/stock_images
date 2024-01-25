import "./overlay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Overlay({ selectedImg, closeOverlay, setSize, handleDownload }) {
  return (
    <section className="overlay">
      <div className="overlay-content">
        <div className="idBar">
          <p>Preview ID: {selectedImg.id}</p>
          <button onClick={closeOverlay}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="img_details">
          <img src={selectedImg.webformatURL} />

          <div className="details-grid">
            {/* Download Section */}
            <div className="download-options">
              <h3>Download</h3>
              <label className="download-option">
                Small
                <span>
                  640x960{"  "}
                  <span className="custom-radio">
                    <input
                      type="radio"
                      name="size"
                      onClick={() => setSize("previewURL")}
                    />
                    <span class="checkmark"></span>
                  </span>
                </span>
              </label>
              <label className="download-option">
                Medium
                <span>
                  1920x2660{"  "}
                  <span className="custom-radio">
                    <input
                      type="radio"
                      name="size"
                      onChange={() => setSize("webformatURL")}
                    />
                    <span class="checkmark"></span>
                  </span>
                </span>
              </label>
              <label className="download-option">
                Big
                <span>
                  2400x3600{"  "}
                  <span className="custom-radio">
                    <input
                      type="radio"
                      name="size"
                      onChange={() => setSize("largeImageURL")}
                    />
                    <span class="checkmark"></span>
                  </span>
                </span>
              </label>
              <label className="download-option">
                Original
                <span>
                  3850x5640{"  "}
                  <span className="custom-radio">
                    <input
                      type="radio"
                      name="size"
                      onChange={() => setSize("largeImageURL")}
                    />
                    <span class="checkmark"></span>
                  </span>
                </span>
              </label>
              <button className="download-button" onClick={handleDownload}>
                Download for free!
              </button>
            </div>

            {/* Information Section */}
            <div className="information-section">
              <h3>Information</h3>
              <div className="information-content">
                <div className="information-item">
                  <span>User</span>
                  <span>{selectedImg.user}</span>
                </div>
                <div className="information-item">
                  <span>User ID</span>
                  <span>{selectedImg.user_id}</span>
                </div>
                <div className="information-item">
                  <span>Type</span>
                  <span>Photo</span>
                </div>
                <div className="information-item">
                  <span>Views</span>
                  <span>{selectedImg.views.toLocaleString("en-US")}</span>
                </div>
                <div className="information-item">
                  <span>Downloads</span>
                  <span>{selectedImg.downloads.toLocaleString("en-US")}</span>
                </div>
                <div className="information-item">
                  <span>Likes</span>
                  <span>{selectedImg.likes.toLocaleString("en-US")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tags">
          <h4>Tags: </h4>
          {selectedImg.tags.split(",").map((tag, i) => (
            <p key={i}>{tag}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Overlay;
