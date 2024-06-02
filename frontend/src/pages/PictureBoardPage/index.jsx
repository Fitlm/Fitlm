import React, { useEffect } from "react";
import "./css/styles.css";
// Pretendard 웹폰트 추가
import "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css";

function App() {
  const handleImageUpload = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  useEffect(() => {
    const scriptResource = document.createElement("script");
    scriptResource.src = "scripts/resource.js";
    scriptResource.async = true;

    const scriptSet = document.createElement("script");
    scriptSet.src = "scripts/set.js";
    scriptSet.async = true;

    const scriptDrag = document.createElement("script");
    scriptDrag.src = "scripts/drag.js";
    scriptDrag.async = true;

    const scriptFlip = document.createElement("script");
    scriptFlip.src = "scripts/flip.js";
    scriptFlip.async = true;

    const scriptUproad = document.createElement("script");
    scriptUproad.src = "scripts/uproad.js";
    scriptUproad.async = true;

    document.body.appendChild(scriptResource);
    document.body.appendChild(scriptSet);
    document.body.appendChild(scriptDrag);
    document.body.appendChild(scriptFlip);
    document.body.appendChild(scriptUproad);

    return () => {
      document.body.removeChild(scriptResource);
      document.body.removeChild(scriptSet);
      document.body.removeChild(scriptDrag);
      document.body.removeChild(scriptFlip);
      document.body.removeChild(scriptUproad);
    };
  }, []);

  return (
    <div id="headerContainer">
      <div id="contentContainer">
        <div id="mainContent">
          <div id="boardContainer">
            <div id="topContainer">
              <label>
                <button id="show">All Days</button>
              </label>
            </div>
            <div id="imageContainer"></div>
            <div id="transformContainer">
              <label>
                <button id="move">
                  MOVE
                  <img
                    src="./images/move.png"
                    className="Buttonicon"
                    alt="Move Icon"
                  />
                </button>
                <button id="tilt">
                  ROTATE
                  <img
                    src="./images/tilt.png"
                    className="Buttonicon"
                    alt="Rotate Icon"
                  />
                </button>
              </label>
            </div>
            <div id="uproadContainer">
              <label>
                <button id="capture">
                  CAPTURE
                  <img
                    src="./images/capture.png"
                    className="Buttonicon"
                    alt="Capture Icon"
                  />
                </button>
              </label>
              <label>
                <button
                  id="uproad"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  UPLOAD
                  <img
                    src="./images/uproad.png"
                    className="Buttonicon"
                    alt="Upload Icon"
                  />
                </button>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
