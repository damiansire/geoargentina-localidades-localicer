import React, { useState, useEffect } from "react";
import localidadesData from "../../../localidades.json"; // Importa el JSON

interface Localidad {
  categoria: string;
  fuente: string;
  municipio: {
    nombre: string;
    id: string;
  };
  departamento: {
    nombre: string;
    id: string;
  };
  nombre: string;
  id: string;
  provincia: {
    nombre: string;
    id: string;
  };
  localidad_censal: {
    nombre: string;
    id: string;
  };
  centroide: {
    lat: number;
    lon: number;
  };
}

interface LocalidadesData {
  localidades: Localidad[];
  total: number;
  cantidad: number;
  parametros: any; // Puedes ajustar el tipo de los parámetros según su estructura
  inicio: string;
}

const { localidades, total, cantidad, parametros, inicio }: LocalidadesData =
  localidadesData;

const LocalidadComponent = ({ localidad }) => {
  debugger;

  try {
    return (
      <div>
        <h2>{localidad.nombre}</h2>
        <p>Categoría: {localidad.categoria}</p>
        <p>Fuente: {localidad.fuente}</p>
        <p>Municipio: {localidad.municipio?.nombre}</p>
        <p>Departamento: {localidad.departamento?.nombre}</p>
        <p>Provincia: {localidad.provincia?.nombre}</p>
        <p>Localidad Censal: {localidad.localidad_censal?.nombre}</p>
        <p>Latitud: {localidad.centroide?.lat}</p>
        <p>Longitud: {localidad.centroide?.lon}</p>
      </div>
    );
  } catch (err) {
    return <></>;
  }
};

const SearchWithDebounce = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Localidad[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Realiza la búsqueda en el array de localidades del JSON
      const results = localidades.filter((localidad) =>
        Object.values(localidad).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearchResults(results);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar..."
      />
      <ul>
        {searchResults.slice(0, 10).map((localidad: Localidad) => (
          <li key={localidad.id}>
            <div>
              <LocalidadComponent localidad={localidad}></LocalidadComponent>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWithDebounce;
