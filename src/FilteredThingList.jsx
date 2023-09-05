import React from "react";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

function FilteredThingList({ maxAge, nameFilter }) {
  const things = useLiveQuery(async () => {
    let thingsQuery = db.things.where("age").between(0, maxAge + 1);

    if (nameFilter !== "") {
      thingsQuery = thingsQuery.and((thing) => thing.name === nameFilter);
    }

    const filteredThings = await thingsQuery.toArray();

    return filteredThings;
  }, [maxAge, nameFilter]);

  console.log("things is: ", things);

  return (
    <>
      <div>
        <h3>Things:</h3>
        <ul className="thinglist-container">
          {things?.map((thing) => (
            <li key={thing.id} className="thing-card">
              <div>
                <p>
                  {thing.name}, {thing.age}
                </p>
              </div>
              <div className="button-row">
                <button
                  className="update-button"
                  onClick={console.log("Something could happen here...")}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={console.log("Something could happen here...")}
                >
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FilteredThingList;
