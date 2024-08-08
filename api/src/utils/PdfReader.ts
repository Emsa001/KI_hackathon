import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loadPDF = async (file:string) => {
    const loader = new PDFLoader(file);
    const pdf = await loader.load();
    return pdf;
}

async function extractTextFromPDF(loader: PDFLoader): Promise<string> {
    const documents = await loader.load();
    return documents.map((doc:any) => doc.text).join('\n');
  }

export { loadPDF, extractTextFromPDF };
