const InputPad = ({ onInput }) => {
    const cells = [1,2,3,4,5,6,7,8,9,'Del']

    return (
        <div className="input-pad">
            <div className="pad-grid">
                {cells.map((c, i) => {
                    const isDel = c === 'Del';
                    return (
                        <button
                            key={i}
                            className={`pad-button ${isDel ? 'delete' : ''}`}
                            onClick={() => onInput(isDel ? null : c)}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label={isDel ? 'Delete' : `Number ${c}`}
                            type="button"
                        >
                            {c}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default InputPad;