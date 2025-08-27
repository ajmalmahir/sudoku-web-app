const InputPad = ({ onInput, onClear }) => (
  <div className="input-pad">
    <div className="pad-grid">
      {[1,2,3,4,5,6,7,8,9].map((value) => (
        <button
          key={value}
          className="pad-button"
          onClick={() => onInput(value)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {value}
        </button>
      ))}
      <button
        className="pad-button clear-button"
        onClick={onClear}
        onMouseDown={(e) => e.preventDefault()}
      >
        clear
      </button>
    </div>
  </div>
);

export default InputPad;