import PdfStamper from "@/pages/Main/components/PdfStamper";
import B from "./B";
import C from "./C";

import "@/assets/css/App.css";

function App() {
  return (
    <div id="app">
      <div>
        <PdfStamper />
        <B />
        <C />
      </div>
    </div>
  );
}

export default App;
