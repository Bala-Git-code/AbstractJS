
// BaseNode.jsx

export const nodeInputStyles = "w-full bg-[#0b0b0b] border border-[#2a2a2a] rounded-[4px] px-2 py-1 text-xs text-[#e6e6e6] focus:outline-none focus:border-[#00ff9c] nodrag placeholder-gray-600 transition-colors";
export const nodeLabelStyles = "block text-[10px] font-bold text-[#00ff9c] uppercase tracking-wider mb-1";

export const BaseNode = ({ label, children, selected }) => (
  <div
    style={{
      backgroundColor: '#121212',
      border: selected ? '1px solid #00ff9c' : '1px solid #2a2a2a',
      borderRadius: '4px',
      minWidth: '200px',
      boxShadow: selected ? '0 0 10px rgba(0, 255, 156, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.2s ease'
    }}
  >
    {/* Header */}
    <div style={{
      padding: '8px 12px',
      backgroundColor: '#0b0b0b',
      borderBottom: '1px solid #2a2a2a',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff0055', marginRight: '8px' }}></div>
      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#e6e6e6', textTransform: 'uppercase' }}>{label}</span>
    </div>

    {/* Body */}
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {children}
    </div>
  </div>
);