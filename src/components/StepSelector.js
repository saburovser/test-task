import React from 'react';

export default (props) => (
    <div>
        <button onClick={props.stepBack}>
            { "Назад" }
        </button>
        <button onClick={props.stepForward}>
            { "Далее" }
        </button>
    </div>
);