const CompletionPopup = ({ finalTime, onNewPuzzle }) => {
  
  const formatTime = (ms) => {
    const time = new Date(ms).toISOString().slice(11, 19);
    return ms < 3600000 ? time.slice(3) : time;
  };

  return (
    <div className='completion-overlay'>
      <div className='completion-popup'>
        <h2>puzzle complete</h2>
        <div className='completion-time'>
          {formatTime(finalTime)}
        </div>
        <button className='new-puzzle-button' onClick={onNewPuzzle}>
          new puzzle
        </button>
      </div>
    </div>
  );
};

export default CompletionPopup;