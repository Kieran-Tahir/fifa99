import React from "react";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

function Filter({
    maxAge,
    setMaxAge,
    nameFilter,
    setNameFilter,
    }) {

    const things = useLiveQuery(async () => {
        const thingNames = await db.things.toArray();
        return thingNames.map((thing) => thing.name);
    }, []);

    return (
        <div className="filter-container">
        <h2>Filter</h2>
        <div className="input-row">
            <p>Age Range:</p>
            <input
            type="range"
            className="age-slider"
            min="0"
            max="100"
            value={maxAge}
            onChange={(ev) => setMaxAge(Number(ev.target.value))}
            />
            <div className="age-values">
            <span>0</span> to <span>{maxAge}</span>
            </div>
        </div>
        <p>Filter by Name:</p>
        <select
            value={nameFilter}
            onChange={(ev) => setNameFilter(ev.target.value)}
        >
            <option value="">All</option>
            {things?.map((thingName, i) => (
            <option value={thingName} key={i}>
                {thingName}
            </option>
            ))}
        </select>
        </div>
    );
}

export default Filter;
