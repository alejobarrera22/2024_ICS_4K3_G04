import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Inicio = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/registrar')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Rubik, sans-serif', marginBottom: '50px', fontWeight: 'bold' }}>Inicio</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{
          background: 'linear-gradient(336deg, rgba(106,188,249,1) 5%, rgba(117,191,249,1) 52%, rgba(135,230,255,1) 94%)',
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 'bold'
        }}
      >
        Publicar Pedido de Envío
      </Button>
    </div>
  )
}

export default Inicio