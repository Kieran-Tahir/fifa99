import React from 'react'; 

function PitchPlayerCard ({square, handleSquareMouseDown, removePlayerFromSquad}) { 
    return (
        <>
            <div
              className="squad-view-player-card"
              onMouseDown={(e) => handleSquareMouseDown(e, square)}
              style={{
                position: square.position,
                left: square.x,
                top: square.y,
                cursor: "pointer",
              }}
            >
              {square.player && (
                <div className="player-info">
                  <p>
                    {square.player.name}
                    <span className="player-rating">
                      {square.player.rating}
                    </span>
                  </p>

                  <button
                    className="delete-button"
                    onClick={() => removePlayerFromSquad(square.player.id)}
                  >
                    x
                  </button>
                </div>
              )}
            </div>
        </>
    ) 
} 
export default PitchPlayerCard 