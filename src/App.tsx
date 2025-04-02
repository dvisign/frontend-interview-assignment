import PdfStamper from "@/pages/Main/components/PdfStamper";
import PDFCanvas from "./pages/Main/components/PDFCanvas";
import C from "./C";

import "@/assets/css/App.css";

function App() {
  return (
    <div id="app">
      <div>
        <PdfStamper />
        <PDFCanvas />
        <C />
      </div>
    </div>
  );
}

export default App;
