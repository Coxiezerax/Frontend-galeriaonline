import { useNavigate } from 'react-router-dom';

export function FarmaciasTurno() {
  const navigate = useNavigate();

  return (
    <>
      <button
        id="btn-farmacias-turno"
        type="button"
        onClick={() => navigate('/farmacias')}
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          zIndex: 1000,
          padding: "12px 24px",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#dc3545",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 0 15px rgba(220,53,69,0.8)",
          fontSize: "1rem",
          animation: "pulse 2s infinite",
        }}
      >
        💊 Farmacias de turno
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  );
}
