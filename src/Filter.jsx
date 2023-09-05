import React from "react";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

function Filter({
    maxRating,
    setMaxRating,
    nameFilter,
    setNameFilter,
    }) {

    const players = useLiveQuery(async () => {
        const playersNames = await db.players.toArray();
        return playersNames.map((player) => player.name);
    }, []);

    return (
        <div className="filter-container">
        <h2>Filter</h2>
        <div className="input-row">
            <p>Rating Range:</p>
            <input
            type="range"
            className="rating-slider"
            min="0"
            max="100"
            value={maxRating}
            onChange={(ev) => setMaxRating(Number(ev.target.value))}
            />
            <div className="age-values">
            <span>0</span> to <span>{maxRating}</span>
            </div>
        </div>
        <p>Filter by Name:</p>
        <select
            value={nameFilter}
            onChange={(ev) => setNameFilter(ev.target.value)}
        >
            <option value="">All</option>
            {players?.map((thingName, i) => (
            <option value={thingName} key={i}>
                {thingName}
            </option>
            ))}
        </select>
        </div>
    );
}

export default Filter;
