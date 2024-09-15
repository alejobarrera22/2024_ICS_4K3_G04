import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertaError () {
  const [open, setOpen] = React.useState(true)
  const [countdown, setCountdown] = React.useState(5) // Tiempo en segundos para redirigir al usuario a la página principal
  const navigate = useNavigate()
  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000)
    } else {
      navigate('/home')// Redirige al usuario a la página principal
    }
  }, [countdown, navigate])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <ErrorOutlineIcon style={{ color: 'red' }} /> Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Ha ocurrido un error en la aplicación. Serás redirigido a la página principal en {countdown} segundos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
            navigate('/home')
          }} color="error">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  )
}
