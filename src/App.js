import React, { useState } from 'react';
import FormulariosPazYSalvos from './FormulariosPazYSalvos';
import DocumentosPazYSalvos from './DocumentosPazYSalvo';

function App() {
  // State to store the URL of the Paz y Salvo document
  const [documentUrl, setDocumentUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle the document search
  const handleSearchDocument = async (cedula) => {
    setLoading(true);
    try {
      // Implement the logic to search the document in Google Drive
      // using the Google Drive API
      // Search code example (replace with actual implementation)
      const document = await searchDocumentInGoogleDrive(cedula);
      if (document) {
        setDocumentUrl(document.url);
        setError('');
      } else {
        setError('Document not found');
      }
    } catch (err) {
      setError('Error searching for document');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Render the form if the document has not been found,
  // otherwise, show the Paz y Salvo document
  return (
    <div>
      {loading && <p>Searching for document...</p>}
      {error && <p>Error: {error}</p>}
      {documentUrl ? (
        <DocumentosPazYSalvos documentUrl={documentUrl} />
      ) : (
        <FormularioPazYSalvos onSearchDocument={handleSearchDocument} />
      )}
    </div>
  );
}

// Example function to search the document in Google Drive (replace with actual implementation)
async function searchDocumentInGoogleDrive(cedula) {
  // Implement the logic to search the document in Google Drive
  // using the Google Drive API
  // Search code example (replace with actual implementation)
  const response = await fetch('https://www.googleapis.com/drive/v3/files?q=cedula:' + cedula);
  const data = await response.json();
  if (data.files && data.files.length > 0) {
    return { url: data.files[0].webViewLink };
  }
  return null;
}

export default App;
