export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '80px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        backgroundColor: '#121212',
        border: '1px solid #00ff9c',
        color: '#e6e6e6',
        boxShadow: '0 0 5px rgba(0, 255, 156, 0.2)',
        justifyContent: 'center',
        flexDirection: 'column',
        transition: 'all 0.2s ease'
      }}
      draggable
    >
      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{label}</span>
    </div>
  );
};
