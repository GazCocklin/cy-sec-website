import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

export const generatePdfFromComponent = async (ReportComponent, fileName) => {
  try {
    const blob = await pdf(ReportComponent).toBlob();
    saveAs(blob, `${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};