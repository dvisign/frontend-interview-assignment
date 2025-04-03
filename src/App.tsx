import PdfStamper from "@/pages/Main/components/PdfStamper";
import PdfCanvas from "./pages/Main/components/PdfCanvas";
import PdfPreview from "./pages/Main/components/PdfPreview";

import "@/assets/css/App.css";

function App() {
  return (
    <div id="app">
      <div>
        <PdfStamper />
        <PdfCanvas />
        <PdfPreview />
      </div>
    </div>
  );
}

export default App;
