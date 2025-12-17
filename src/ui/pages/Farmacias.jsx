// src/ui/pages/Farmacias.jsx
import { useEffect, useState } from "react";
import "../styles/Farmacias.css";
import { fetchFarmaciasHoy } from "../../lib/api";

// Helper para mostrar la fecha DD-MM-YYYY
const formatearFecha = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
};



// Mapa de fk_region (MINSAL) -> número romano oficial + nombre de región
const REGION_MAP = {
  "1": { roman: "XV", name: "Arica y Parinacota" },
  "2": { roman: "I", name: "Tarapacá" },
  "3": { roman: "II", name: "Antofagasta" },
  "4": { roman: "III", name: "Atacama" },
  "5": { roman: "IV", name: "Coquimbo" },

  // Viña, Valparaíso, Llay Llay, Los Andes, San Antonio, etc.
  "6": { roman: "V", name: "Valparaíso" },

  // RM (Buín, Puente Alto, Maipú, etc.)
  "7": { roman: "RM", name: "Región Metropolitana" },

  // O'Higgins (Rancagua, San Fernando, Santa Cruz…)
  "8": { roman: "VI", name: "O'Higgins" },

  // Maule (Talca, Curicó, Linares…)
  "9": { roman: "VII", name: "Maule" },

  // Biobío (Concepción, Coronel, Lota…)
  "10": { roman: "VIII", name: "Biobío" },

  // Araucanía (Temuco, Villarrica, Angol…)
  "11": { roman: "IX", name: "La Araucanía" },

  // Los Ríos (Valdivia, La Unión, Panguipulli…)
  "12": { roman: "XIV", name: "Los Ríos" },

  // Los Lagos (Puerto Montt, Osorno, Chiloé…)
  "13": { roman: "X", name: "Los Lagos" },

  // Aysén
  "14": { roman: "XI", name: "Aysén" },

  // Magallanes
  "15": { roman: "XII", name: "Magallanes" },

  // Ñuble
  "16": { roman: "XVI", name: "Ñuble" },
};

const getRegionLabel = (code) => {
  const key = String(code);
  const data = REGION_MAP[key];
  if (!data) return `Región ${key}`;
  return `Región ${data.roman} – ${data.name}`;
};

export default function Farmacias() {
  const [farmacias, setFarmacias] = useState([]);
  const [farmaciasFiltradas, setFarmaciasFiltradas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [regionFiltro, setRegionFiltro] = useState("");
  const [comunaFiltro, setComunaFiltro] = useState("");
  const [fechaHoy, setFechaHoy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar farmacias al entrar
  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFarmaciasHoy();

        console.log("FARMACIAS HOY 👉", data);

        setFarmacias(data);
        setFarmaciasFiltradas(data);

        // Regiones únicas (como string)
        const regs = [...new Set(data.map((f) => String(f.fk_region)))].sort(
          (a, b) => Number(a) - Number(b)
        );
        setRegiones(regs);

        // Fecha: tomo la del primer registro
        if (data.length > 0 && data[0].fecha) {
          setFechaHoy(formatearFecha(String(data[0].fecha)));
        }
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar las farmacias. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // Recalcular comunas y filtrado cada vez que cambian filtros
  useEffect(() => {
    let lista = [...farmacias];

    if (regionFiltro) {
      lista = lista.filter((f) => String(f.fk_region) === regionFiltro);
    }

    // Comunas según lo que quede después del filtro de región
    const nuevasComunas = [
      ...new Set(lista.map((f) => f.comuna_nombre).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b, "es-CL"));
    setComunas(nuevasComunas);

    if (comunaFiltro) {
      lista = lista.filter((f) => f.comuna_nombre === comunaFiltro);
    }

    setFarmaciasFiltradas(lista);
  }, [regionFiltro, comunaFiltro, farmacias]);

  const limpiarFiltros = () => {
    setRegionFiltro("");
    setComunaFiltro("");
    setFarmaciasFiltradas(farmacias);
  };

  return (
    <div className="farmacias-page">
      <div className="farmacias-container">
        <h1>💊 Farmacias de Turno en Chile</h1>

        {fechaHoy && (
          <p className="resultados-count">
            Farmacias de turno para el día <strong>{fechaHoy}</strong>
          </p>
        )}

        {error && <div className="error-message">⚠️ {error}</div>}
        {loading && <p className="loading">Cargando farmacias...</p>}

        {/* Filtros */}
        <section className="filtros-section">
          <div className="filtro-grupo">
            <label>Región:</label>
            <select
              value={regionFiltro}
              onChange={(e) => {
                setRegionFiltro(e.target.value);
                setComunaFiltro("");
              }}
            >
              <option value="">Todas las regiones</option>
              {regiones.map((r) => (
                <option key={r} value={r}>
                  {getRegionLabel(r)}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Comuna:</label>
            <select
              value={comunaFiltro}
              onChange={(e) => setComunaFiltro(e.target.value)}
              disabled={!regionFiltro}
            >
              <option value="">Todas las comunas</option>
              {comunas.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="btn-limpiar" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        </section>

        {/* Resultados */}
        <section className="resultados-section">
          {farmaciasFiltradas.length > 0 && !loading && (
            <p className="resultados-count">
              {farmaciasFiltradas.length} farmacia(s) encontrada(s)
            </p>
          )}

          {farmaciasFiltradas.length === 0 && !loading && !error && (
            <div className="no-resultados">
              No hay farmacias con los filtros seleccionados.
            </div>
          )}

          <div className="farmacias-grid">
            {farmaciasFiltradas.map((f) => {
              const horaApertura = f.funcionamiento_hora_apertura
                ? String(f.funcionamiento_hora_apertura).slice(0, 5)
                : "—";
              const horaCierre = f.funcionamiento_hora_cierre
                ? String(f.funcionamiento_hora_cierre).slice(0, 5)
                : "—";

              const lat = f.local_lat;
              const lng = f.local_lng;
              const urlMaps =
                lat && lng
                  ? `https://www.google.com/maps?q=${lat},${lng}`
                  : null;

              return (
                <article
                  key={f.local_id || `${f.local_nombre}-${f.comuna_nombre}`}
                  className="farmacia-card"
                >
                  <div className="card-header">
                    <h3 className="farmacia-nombre">
                      {f.local_nombre || "Farmacia"}
                    </h3>
                    <span className="badge">
                      {f.comuna_nombre || "Sin comuna"}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="info-row">
                      <span className="label">Región:</span>
                      <span className="value">
                        {getRegionLabel(f.fk_region)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Dirección:</span>
                      <span className="value">
                        {f.local_direccion || "Sin información"}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Teléfono:</span>
                      <span className="value">
                        {f.local_telefono && f.local_telefono.trim() !== ""
                          ? f.local_telefono
                          : "No informado"}
                      </span>
                    </div>
                    <div className="info-row horario">
                      <span className="label">Horario:</span>
                      <span className="value">
                        {horaApertura} – {horaCierre}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer">
                    {urlMaps ? (
                      <a
                        href={urlMaps}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-mapa"
                      >
                        Ver en Google Maps
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.85rem", color: "#666" }}>
                        Sin coordenadas de mapa
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
