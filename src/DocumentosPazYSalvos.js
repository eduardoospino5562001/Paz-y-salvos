import React, { useState } from 'react';

// Definición del componente Funcional DocumentosPazYSalvos
function DocumentosPazYSalvos({ documentoUrl }) {
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  // Función para manejar la descarga del documento
  const handleDescargarDocumento = async () => {
    setDownloading(true);
    try {
      // Implementar la lógica para descargar el documento
      // Ejemplo de código de descarga (reemplazar con la implementación real)
      const response = await fetch(documentoUrl);
      const data = await response.blob();
      const blobUrl = URL.createObjectURL(data);
      window.open(blobUrl, '_blank');
      setError('');
    } catch (err) {
      setError('Error al descargar el documento');
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  // Renderiza el enlace para descargar el documento de Paz y Salvo
  return (
    <div>
      <h2>Documento de Paz y Salvo</h2>
      <p>Por favor, haz clic en el enlace para descargar tu documento de Paz y Salvo:</p>
      {downloading ? (
        <p>Descargando...</p>
      ) : (
        <button onClick={handleDescargarDocumento} disabled={downloading}>
          Descargar Paz y Salvo
        </button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default DocumentosPazYSalvos;
