"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var diamond_svg_1 = require("/assets/images/diamond.svg");
require("./App.css");
var CountButton_1 = require("./components/CountButton");
function App() {
    return (<>
      <div>
        <a href="https://intranet.diamond.ac.uk/Home.html" target="_blank">
          <img src={diamond_svg_1.default} className="logo" alt="Diamond Web logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <CountButton_1.CountButton />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>);
}
exports.default = App;
