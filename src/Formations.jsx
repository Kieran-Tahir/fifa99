import React, { useState } from 'react';
import { db } from './db';

function Formations({ formations, setFormations, setSquares, squares }) {
  const [formationName, setFormationName] = useState('');

  const saveFormation = async () => {
    try {
      const formation = {
        name: formationName || `Formation-${new Date().toISOString()}`,
        layout: squares,
      };
      const id = await db.formations.add(formation);
      formation.id = id; // Include the ID in your formation object
      setFormations([...formations, formation]);
      setFormationName('');
    } catch (error) {
      console.error(`Failed to save formation: ${error}`);
    }
  };

  const loadFormation = async (formationId) => {
    const id = Number(formationId);
    try {
      const formation = await db.formations.get(id);
      if (formation) {
        setSquares(formation.layout);
      }
    } catch (error) {
      console.error(`Failed to load formation: ${error}`);
    }
  };

  const clearFormation = () => {
    setSquares([]);
  };

  return (
    <div>
      <div className="formation-controls">
        <input
          type="text"
          placeholder="Formation name"
          value={formationName}
          onChange={(e) => setFormationName(e.target.value)}
        />
        <button onClick={saveFormation}>Save Formation</button>
        <button onClick={clearFormation}>Create New Formation</button>
      </div>
      <div className="existing-formations">
        {formations.map((formation) => (
          <div key={formation.id} onClick={() => loadFormation(formation.id)}>
            {formation.name} ({new Date(formation.id).toLocaleString()})
          </div>
        ))}
      </div>
    </div>
  );
}

export default Formations;
