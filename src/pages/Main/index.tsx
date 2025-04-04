import PdfStamper from "@/pages/Main/components/PdfStamper";
import PdfCanvas from "@/pages/Main/components/PdfCanvas";
import PdfPreview from "@/pages/Main/components/PdfPreview";

const Main = () => {
  return (
    <div>
      <PdfStamper />
      <PdfCanvas />
      <PdfPreview />
    </div>
  );
};

export default Main;
