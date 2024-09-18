import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Inicio = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/registrar')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'sans-serif', marginBottom: '50px', fontWeight: 'bold', color: 'white' }}>¡Bienvenido a Nuestro Servicio de Envíos!</h1>
      <p style={{ fontFamily: 'sans-serif', marginBottom: '50px', fontWeight: 'bold', color:'white'}}>
        Publica tus pedidos de envío de manera rápida y sencilla.
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{
          background: 'linear-gradient(336deg, rgba(106,188,249,1) 5%, rgba(117,191,249,1) 52%, rgba(135,230,255,1) 94%)',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: '#03045E',
          borderRadius: '50px', // Bordes redondeados
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', // Sombra suave
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative', // Para el efecto 3D
          overflow: 'hidden',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-5px)'; // Efecto de elevación al hover
          e.target.style.boxShadow = '0 15px 20px rgba(0, 0, 0, 0.15)'; // Más sombra al hover
          e.target.style.background = 'linear-gradient(145deg, #009fff, #00d4ff)'; // Cambiar dirección del degradado al hover
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0px)';
          e.target.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
          e.target.style.background = 'linear-gradient(145deg, #00d4ff, #009fff)'; // Volver a degradado inicial
        }}
      >
        Publicar Pedido de Envío
      </Button>
    </div>
  )
}

export default Inicio