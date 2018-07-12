import React from 'react';

export default (props) => (
    <div className="SELECTOR">
        <button className="SELECTOR__BUTTONBACK" onClick={props.stepBack}>
            { "Назад" }
        </button>
        <button className="SELECTOR__BUTTONFORWARD" onClick={props.stepForward}>
            { "Далее" }
        </button>
    </div>
);