import React, { useState } from 'react';

// Definición del componente Funcional FormularioPazYSalvos
function FormulariosPazYSalvos({ onBuscarDocumento }) {
  // Estado para almacenar el número de cédula ingresado por el usuario
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar el cambio en el campo de entrada
  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
    setError('');
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validación básica del número de cédula
    if (!/^\d+$/.test(cedula)) {
      setError('El número de cédula debe ser numérico');
      setLoading(false);
      return;
    }

    // Buscar el documento de Paz y Salvo en Google Drive
    try {
      const documentoUrl = await onBuscarDocumento(cedula);
      if (documentoUrl) {
        // Redirigir al usuario a la página de documentos con el documento encontrado
        // (implementar la lógica de redirección)
      } else {
        setError('Documento no encontrado');
      }
    } catch (err) {
      setError('Error al buscar el documento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Renderiza el formulario con un campo de entrada para la cédula y un botón de búsqueda
  return (
    <div>
      <h2>Formulario de Paz y Salvo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Número de Cédula:
          <input
            type="text"
            value={cedula}
            onChange={handleCedulaChange}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>Buscar</button>
      </form>
    </div>
  );
}

export default FormulariosPazYSalvos;
