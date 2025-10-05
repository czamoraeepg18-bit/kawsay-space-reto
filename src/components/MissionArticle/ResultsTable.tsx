import React, { useState } from 'react';
import './ResultsTable.css';

interface ResultRow {
  effect: string;
  destruction: string;
  repair: string;
}

const ResultsTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const results: ResultRow[] = [
    {
      effect: "Baja el volumen de hueso (~6%) y grosor en las pelvis.",
      destruction: "Los osteoclastos estaban muy activos: aumentaron muchísimo en las superficies de hueso trabecular.",
      repair: "Los osteoblastos están detenidos: el gen CDKN1a/p21 estaba mucho más activo, lo que sugiere que esas células no se dividían ni reparaban bien."
    },
    {
      effect: "Aparecen más 'lagunas' más grandes donde los osteocitos están",
      destruction: "Sí — hay señales de que los osteocitos están agrandando su espacio, destruyendo hueso alrededor (osteólisis osteocítica).",
      repair: "—"
    },
    {
      effect: "Genes de destrucción de matriz aumentaron (MMP-1, -3, -10)",
      destruction: "Sí — estos genes ayudan a romper hueso.",
      repair: "—"
    },
    {
      effect: "Gen para detener división (CDKN1a/p21) aumentó mucho",
      destruction: "—",
      repair: "Sí — encontraron este frenazo al ciclo celular."
    }
  ];

  return (
    <div className="results-table">
      <div className="results-table__wrapper">
        <table className="results-table__table">
          <thead>
            <tr>
              <th className="results-table__header">Lo que pasó</th>
              <th className="results-table__header results-table__header--destruction">
                <span className="results-table__header-icon">🐉</span>
                "Dragones" / Destrucción
              </th>
              <th className="results-table__header results-table__header--repair">
                <span className="results-table__header-icon">🔨</span>
                "Constructores" / Reparación
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => (
              <tr 
                key={index}
                className={`results-table__row ${selectedRow === index ? 'results-table__row--selected' : ''}`}
                onClick={() => setSelectedRow(selectedRow === index ? null : index)}
              >
                <td className="results-table__cell results-table__cell--effect">
                  {row.effect}
                </td>
                <td className="results-table__cell results-table__cell--destruction">
                  {row.destruction}
                </td>
                <td className="results-table__cell results-table__cell--repair">
                  {row.repair}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="results-table__legend">
        <div className="results-table__legend-item">
          <span className="results-table__legend-icon results-table__legend-icon--destruction">🐉</span>
          <span>Dragones = Destrucción de hueso</span>
        </div>
        <div className="results-table__legend-item">
          <span className="results-table__legend-icon results-table__legend-icon--repair">🔨</span>
          <span>Constructores = Reparación de hueso</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;