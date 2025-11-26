# ReviewGen - AI-Powered Performance Review Generator

A local-first, privacy-focused web application that helps managers generate comprehensive performance reviews using AI. Built with React, Vite, and Tailwind CSS.

## Features

- **🔒 Privacy-First**: All processing happens in your browser. No data is sent to any server except the AI provider you choose
- **🔑 BYOK (Bring Your Own Key)**: Use your own OpenAI or Anthropic API key - no middleman, no markup
- **📁 File Upload**: Drag-and-drop support for .pdf, .docx, and .txt files
- **🤖 Multi-Model Support**: Choose from 10 different AI models across OpenAI and Anthropic
- **🎚️ Competency Ratings**: Interactive sliders for universal and role-specific competencies
- **📝 Flexible Input**: Upload existing notes or rate competencies from scratch
- **✍️ Verbatim Mode**: Option to preserve manager notes exactly as written

## Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- An API key from either OpenAI or Anthropic

### Installation

1. Navigate to the ReviewGen directory:
```bash
cd reviewgen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory. You can serve them with any static file server or open `dist/index.html` directly in your browser.

## Usage Guide

### 1. Select Model & Enter API Key

1. Select your preferred AI model from the dropdown:

   **OpenAI Models:**
   | Model | Best For |
   |-------|----------|
   | GPT-4o | Most capable, best quality |
   | GPT-4o Mini | Fast & affordable |
   | GPT-4 Turbo | Previous flagship |
   | o1 | Advanced reasoning tasks |
   | o1 Mini | Fast reasoning |
   | o3 Mini | Latest reasoning model |

   **Anthropic Models:**
   | Model | Best For |
   |-------|----------|
   | Claude Sonnet 4.5 | Latest, most capable |
   | Claude 3.5 Sonnet | Fast & capable |
   | Claude 3.5 Haiku | Fastest, most affordable |
   | Claude 3 Opus | Deep analysis |

2. Enter your API key for the selected provider
   - **OpenAI**: Get your key at https://platform.openai.com/api-keys
   - **Anthropic**: Get your key at https://console.anthropic.com/settings/keys
3. Your API key is stored only in your browser's memory (not persisted)

### 2. Upload Feedback Files

**360 Peer Feedback** (multiple files):
- Drag and drop one or more files from peer feedback surveys
- Supported formats: .pdf, .docx, .txt

**Self Review** (single file):
- Upload the employee's self-assessment
- Supported formats: .pdf, .docx, .txt

**Manager Review** (optional):
- Upload your existing manager notes if you have them
- Check "Preserve notes verbatim" to include them exactly as written
- Or skip this and use the competency sliders instead

### 3. Rate Competencies

Use the sliders to rate each competency on a 1-4 scale:

**Universal Criteria** (for all roles):
- **Craft/Quality**: Excellence in core role responsibilities
- **Speed**: Reasonable execution pace + proactive unblocking
- **Adaptiveness**: Willingness to change and flexibility

**Role-Specific Competencies**:
- **Code Quality**: Clean, maintainable, well-tested code
- **System Design**: Architectural thinking and scalability
- **Mentoring**: Helping others grow and learn

**Rating Scale**:
- **4 - Meets Expectations**: Target for everyone
- **3 - Needs Improvement**: Good work but needs to speak up when blocked
- **2 - Below Expectations**: Slow work, quality issues, or resistance to change
- **1 - Unacceptable**: Significant performance issues

### 4. Generate Review

Click "Generate Performance Review" to create a comprehensive review that:
- Synthesizes all uploaded feedback
- Incorporates your competency ratings
- Organizes content into: Summary, Strengths, Areas for Development, Development Plan
- Maintains a constructive, growth-oriented tone

### 5. Copy and Edit

- Copy the generated review to your clipboard
- Edit as needed to add personal context
- The AI provides a strong draft - you provide the final touch

## File Structure

```
reviewgen/
├── src/
│   ├── components/          # React components (future)
│   ├── utils/
│   │   └── fileParser.js    # PDF/DOCX/TXT parsing utilities
│   ├── App.jsx              # Main application component
│   ├── index.css            # Tailwind CSS + custom styles
│   └── main.jsx             # React entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Technology Stack

- **React 18**: UI framework
- **Vite 6**: Build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **react-dropzone**: File upload handling
- **mammoth**: DOCX parsing
- **pdfjs-dist**: PDF parsing
- **openai**: OpenAI API client
- **@anthropic-ai/sdk**: Anthropic API client

## Security & Privacy

### Local-First Architecture

- All file parsing happens in your browser using client-side JavaScript
- No files are uploaded to any server (except the AI provider for review generation)
- API keys are stored only in component state (not persisted to disk)

### Browser Compatibility

This app uses `dangerouslyAllowBrowser: true` for the AI SDKs, which means:
- ✅ Works entirely in the browser without a backend
- ⚠️ Your API key is visible in browser memory while the app is open
- 💡 Best practice: Use a separate API key with usage limits for this tool

### Recommended Security Practices

1. **Create a dedicated API key** for ReviewGen with spending limits
2. **Don't commit your API key** to any repository
3. **Close the browser tab** when done to clear the API key from memory
4. **Consider using environment variables** for team deployments

## Customization

### Adding Role-Specific Competencies

Edit the `ROLE_SPECIFIC_COMPETENCIES` array in `src/App.jsx`:

```javascript
const ROLE_SPECIFIC_COMPETENCIES = [
  { id: 'code_quality', name: 'Code Quality', description: '...' },
  { id: 'system_design', name: 'System Design', description: '...' },
  // Add your own:
  { id: 'new_competency', name: 'New Competency', description: '...' }
];
```

### Adding New AI Models

Edit the `MODELS` object in `src/App.jsx` to add new models:

```javascript
const MODELS = {
  // Add a new OpenAI model
  'gpt-5': { name: 'GPT-5', provider: 'openai', description: 'Next generation' },
  // Add a new Anthropic model
  'claude-4-opus': { name: 'Claude 4 Opus', provider: 'anthropic', description: 'Future model' },
};
```

### Customizing the Prompt

Edit the `buildPrompt()` function in `src/App.jsx` to change how the AI generates reviews.

## Troubleshooting

### PDF files aren't parsing correctly

- Ensure the PDF contains selectable text (not scanned images)
- Try exporting the PDF with OCR enabled
- Use .txt or .docx format instead

### API errors

- Verify your API key is correct
- Check your API account has available credits
- Ensure you're not rate-limited
- Check browser console for detailed error messages

### Build errors

- Delete `node_modules/` and run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`
- Ensure Node.js version is 18+

## Development

### Running Tests

(Tests not yet implemented)

```bash
npm run test
```

### Linting

(Linting not yet configured)

```bash
npm run lint
```

## Contributing

This is part of the larger performance review framework. See the main repository README for contribution guidelines.

## License

Internal use only. Customize for your organization's needs.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Contact your engineering manager or HR team
