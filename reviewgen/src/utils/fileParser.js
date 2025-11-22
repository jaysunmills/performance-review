import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

/**
 * Parse a text file
 * @param {File} file - The file to parse
 * @returns {Promise<string>} - The extracted text
 */
async function parseTxtFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
}

/**
 * Parse a PDF file
 * @param {File} file - The PDF file to parse
 * @returns {Promise<string>} - The extracted text
 */
async function parsePdfFile(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Parse a DOCX file
 * @param {File} file - The DOCX file to parse
 * @returns {Promise<string>} - The extracted text
 */
async function parseDocxFile(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new Error(`Failed to parse DOCX: ${error.message}`);
  }
}

/**
 * Parse a file based on its type
 * @param {File} file - The file to parse
 * @returns {Promise<{filename: string, content: string}>} - The parsed file data
 */
export async function parseFile(file) {
  const extension = file.name.split('.').pop().toLowerCase();

  let content;

  switch (extension) {
    case 'txt':
      content = await parseTxtFile(file);
      break;
    case 'pdf':
      content = await parsePdfFile(file);
      break;
    case 'docx':
      content = await parseDocxFile(file);
      break;
    default:
      throw new Error(`Unsupported file type: .${extension}`);
  }

  return {
    filename: file.name,
    content: content.trim()
  };
}

/**
 * Parse multiple files
 * @param {File[]} files - Array of files to parse
 * @returns {Promise<Array<{filename: string, content: string}>>} - Array of parsed file data
 */
export async function parseFiles(files) {
  const parsePromises = files.map(file => parseFile(file));
  return Promise.all(parsePromises);
}
