import React, { useState } from 'react'
import { Paper, Container, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';

import SimpleBackdrop from './SimpleBackdrop'
import VisuallyHiddenInput from './VisuallyHiddenInput'
import { useNavigate } from 'react-router-dom'
import AlertaError from './AlertaError'
import { lightBlue } from '@mui/material/colors'
import FormHelperText from '@mui/material/FormHelperText'
// import VolverAlInicio from './VolverAlInicio' // Importa el nuevo componente
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import enviarMailPedidoDeEnvio from '../helpers/sendMail'
import sendEmail from './enviarEmail'
import transportistas from '../database/transportistas.json'
import greenOkImage from '../assets/green-oksvg.svg'
import provincias from '../database/provincias.json'

console.log(transportistas[0])

const initialFormState = {
  tipoDeCarga: '',
  domicilioRetiro: {
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
    referencia: ''
  },
  domicilioEntrega: {
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
    referencia: ''
  },
  fechaRetiro: 'date',
  fechaEntrega: 'date',
  descripcion: '',
  email: '',
  foto: 'string'
}

const initialErrorsState = {
  tipoDeCarga: '',
  calleRetiro: '',
  numeroRetiro: '',
  localidadRetiro: '',
  provinciaRetiro: '',
  referenciaRetiro: '',
  calleEntrega: '',
  numeroEntrega: '',
  localidadEntrega: '',
  provinciaEntrega: '',
  referenciaEntrega: '',
  fechaRetiro: '',
  fechaEntrega: ''
}

const lightBlueColor = lightBlue[500300]
// sendCustomEmail({to_email: ''})
const FormularioPedidoEnvio = () => {
  const navigate = useNavigate()
  // Estados para almacenar los datos del formulario
  const [formData, setFormData] = useState(initialFormState)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [openMailSuccess, setOpenMailSuccess] = useState(false);  // Para el éxito del envío del correo
  const [accordionRetiro, setAccordionRetiro] = React.useState(false)
  const [accordionEntrega, setAccordionEntrega] = React.useState(false)
  const [showMailPopup, setShowMailPopup] = useState(false);
  // Estado para almacenar los errores de validación
  const [formErrors, setFormErrors] = useState(initialErrorsState)

  // Estado para el backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false)

  // Estado para mostrar error
  const [openError, setOpenError] = useState(false)

  // Manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name.includes('.')) {
      const [firstProp, secondProp] = name.split('.')
      setFormData({
        ...formData,
        [firstProp]: {
          ...formData[firstProp],
          [secondProp]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  //  console.log(formData)

  // Manejar el accordion
  const handleOpenRetiro = () => {
    setAccordionRetiro(!accordionRetiro)
  }
  // Manejar el accordion
  const handleOpenEntrega = () => {
    setAccordionEntrega(!accordionEntrega)
  }

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = { }

    // Validación de fechas
    const fechaRetiro = formData.fechaRetiro
    const fechaEntrega = formData.fechaEntrega
    const currentDate = new Date()

    const añoActual = currentDate.getFullYear()
    const mesActual = String(currentDate.getMonth() + 1).padStart(2, '0')
    const diaActual = String(currentDate.getDate()).padStart(2, '0')

    const fechaActualEnFormatoDeseado = `${añoActual}-${mesActual}-${diaActual}`

    console.log('Fecha actual: ', fechaActualEnFormatoDeseado, '\nFecha de retiro:', fechaRetiro, '\nFecha de Entrega: ', fechaEntrega)

    if (fechaRetiro < fechaActualEnFormatoDeseado) {
      errors.fechaRetiro = 'La fecha de retiro debe ser mayor o igual a la fecha actual'
    }

    if (fechaEntrega < fechaActualEnFormatoDeseado) {
      errors.fechaEntrega = 'La fecha de entrega debe ser mayor o igual a la fecha actual'
    }

    if (fechaEntrega < fechaRetiro) {
      errors.fechaEntrega = 'La fecha de entrega debe ser mayor o igual a la fecha de retiro'
    }

    if (formData.tipoDeCarga === '') {
      errors.tipoDeCarga = 'Debe seleccionar una opción en "Tipo de Carga"'
    }
    
    if (formData?.domicilioRetiro?.calle === '') {
      errors.calleRetiro = 'El campo Calle es obligatorio.'
    }
    if (formData.domicilioRetiro?.calle.length > 150){
      errors.calleRetiro = 'El campo Calle no puede superar los 150 caracteres.'
    }
    if (formData.domicilioRetiro.numero.length > 6) {
      errors.numeroRetiro = 'El campo Numero no puede superar los 6 caracteres.'
    }
    if (formData.domicilioRetiro.localidad === '') {
      errors.localidadRetiro = 'El campo Localidad es obligatorio.'
    }
    if (formData.domicilioRetiro.provincia === '') {
      errors.provinciaRetiro = 'El campo Provincia es obligatorio.'
    }
    if (formData?.domicilioEntrega?.calle === '') {
      errors.calleEntrega = 'El campo Calle es obligatorio.'
    }
    if (formData.domicilioEntrega.calle.length > 150) {
      errors.calleEntrega = 'El campo Calle no puede superar los 150 caracteres.'
    }
    if (formData.domicilioEntrega.numero.length > 6) {
      errors.numeroEntrega = 'El campo Numero no puede superar los 6 caracteres.'
    }
    if (formData.domicilioEntrega.localidad === '') {
      errors.localidadEntrega = 'El campo Localidad es obligatorio.'
    }
    if (formData.domicilioEntrega.provincia === '') {
      errors.provinciaEntrega = 'El campo Provincia es obligatorio.'
    }
    if (formData.fechaRetiro === 'date') {
      errors.fechaRetiro = 'Se debe seleccionar la fecha de retiro.'
    }
    if (formData.fechaEntrega === 'date') {
      errors.fechaEntrega = 'Se debe seleccionar la fecha de entrega.'
    }

    setFormErrors(errors)

    console.log('Datos de formulario: ', formData)
    // Si hay errores, no enviar el formulario
    if (Object.values(errors).some((error) => error !== '')) {
      console.log('entro en el if de errores')
      return
    }

    setOpenConfirm(true)
  }

  const handleConfirm = async () => {
    setOpenConfirm(false)
    setOpenBackdrop(true)
    // Aquí va el código para enviar los datos
    try {
      // Crear un nuevo objeto formData con la fecha formateada
      const formattedFormData = {
        ...formData,
        foto: selectedFile || null
      }
      console.log(formattedFormData)
      console.log(formattedFormData.domicilioRetiro)
      const transportistaEncontrado = transportistas.find((transportista) =>
        (formattedFormData.domicilioRetiro.localidad.toLowerCase() === transportista.localidad.toLowerCase() && formattedFormData.domicilioRetiro.provincia.toLowerCase() === transportista.provincia.toLowerCase())
      )
      const transportistaEncontrado2 = transportistas.find((transportista) =>
        formattedFormData.domicilioEntrega.localidad.toLowerCase() === transportista.localidad.toLowerCase() && formattedFormData.domicilioEntrega.provincia.toLowerCase() === transportista.provincia.toLowerCase())
      console.log('formdata')
      console.log(formData)
      if (transportistaEncontrado) {
        const detailsEncontrado = {
          to_email: transportistaEncontrado.email, 
          to_name: transportistaEncontrado.nombre, 
          tipoDeCarga: formData.tipoDeCarga,
          domicilioEntrega_calle: formData.domicilioEntrega.calle,
          domicilioEntrega_numero: formData.domicilioEntrega.numero,
          domicilioEntrega_localidad: formData.domicilioEntrega.localidad,
          domicilioEntrega_provincia: formData.domicilioEntrega.provincia,
          fechaEntrega: formData.fechaEntrega,
          domicilioRetiro_calle: formData.domicilioRetiro.calle,
          domicilioRetiro_numero: formData.domicilioRetiro.numero,
          domicilioRetiro_localidad: formData.domicilioRetiro.localidad,
          domicilioRetiro_provincia: formData.domicilioRetiro.provincia,
          fechaRetiro: formData.fechaRetiro,
        };
        sendEmail(detailsEncontrado);
        console.log('Mail enviado correctamente a transportistaEncontrado...');
      }
      if (transportistaEncontrado2) {
        const detailsEncontrado2 = {
          to_email: transportistaEncontrado2.email, 
          to_name: transportistaEncontrado2.nombre, 
          tipoDeCarga: formData.tipoDeCarga,
          domicilioEntrega_calle: formData.domicilioEntrega.calle,
          domicilioEntrega_numero: formData.domicilioEntrega.numero,
          domicilioEntrega_localidad: formData.domicilioEntrega.localidad,
          domicilioEntrega_provincia: formData.domicilioEntrega.provincia,
          fechaEntrega: formData.fechaEntrega,
          domicilioRetiro_calle: formData.domicilioRetiro.calle,
          domicilioRetiro_numero: formData.domicilioRetiro.numero,
          domicilioRetiro_localidad: formData.domicilioRetiro.localidad,
          domicilioRetiro_provincia: formData.domicilioRetiro.provincia,
          fechaRetiro: formData.fechaRetiro,
        };
        sendEmail(detailsEncontrado2);
        console.log('Mail enviado correctamente a transportistaEncontrado...');
      }
      // Indicar que el mail se envió correctamente y abrir el popup de éxito del correo.


      // Enviar datos a la API
      setOpenBackdrop(true)
      // Simular un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Manejar la respuesta de la API
      setOpenBackdrop(false)
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenMailSuccess(true);
      }, 2000); // Ajusta el tiempo según sea necesario
      // limpio los campos
      setFormData(initialFormState)
      setSelectedFile(null)
      setOpenError(false)
      setFormErrors({})
    } catch (error) {
      console.error(error)
      setOpenBackdrop(false)
      // alert("Ha ocurrido un error!, toca el boton para ser redirigido a la pagina principal.");
      // navigate("/home");
      setOpenError(true)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '45px' }}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom fontFamily={'Rubik, sans-serif'} fontSize='1.75em'>
                Publicar Pedido de Envio
              </Typography>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12} textAlign={'left'}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Tipo de Carga *</InputLabel>
             <Select
                style={ { fontFamily: 'Rubik, sans-serif' } }
                label="Tipo de Carga"
                variant='outlined'
                name='tipoDeCarga'
                fullWidth
                value={formData.tipoDeCarga}
                onChange={e => handleInputChange(e)}
                color={lightBlueColor}
                error={!!formErrors.tipoDeCarga}
              >
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'documentacion'}>Documentación</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'paquete'}>Paquete</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'granos'}>Granos</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'hacienda'}>Hacienda</MenuItem>
              </Select>
              <FormHelperText error={!!formErrors.tipoDeCarga}>{formErrors.tipoDeCarga}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontFamily={'Rubik, sans-serif'}>
                Domicilio de Retiro
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary id="panel-header" aria-controls="panel-content" onClick={handleOpenRetiro}>
                  {accordionRetiro ? <KeyboardArrowUpIcon></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item xs={12}>
                    <TextField
                      label="Calle"
                      variant="standard"
                      fullWidth
                      name="domicilioRetiro.calle"
                      value={formData.domicilioRetiro.calle}
                      onChange={handleInputChange}
                      color={lightBlueColor}
                      error={!!formErrors.calleRetiro}
                      helperText={formErrors.calleRetiro}
                      />
                  </Grid >
                  <Grid item xs={12}>
                    <TextField
                      label="Número"
                      variant="standard"
                      fullWidth
                      name="domicilioRetiro.numero"
                      value={formData.domicilioRetiro.numero}
                      error={!!formErrors.numeroRetiro}
                      helperText={formErrors.numeroRetiro}
                      onChange={handleInputChange}
                      color={lightBlueColor}
                      type='number'
                    />
                  </Grid>
                  <Grid item xs={12} textAlign={'left'} marginY={'1em'}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Provincia</InputLabel>
                      <Select
                          style={ { fontFamily: 'Rubik, sans-serif' } }
                          label="Provincia"
                          variant='outlined'
                          name='domicilioRetiro.provincia'
                          fullWidth
                          value={formData.domicilioRetiro.provincia}
                          onChange={e => handleInputChange(e)}
                          color={lightBlueColor}
                          error={!!formErrors.provinciaRetiro}
                        >
                          {provincias.map((prov) => (
                          <MenuItem key={prov.id} style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={`${prov.nombre}`}>{prov.nombre}</MenuItem>))}
                      </Select>
                    <FormHelperText error={!!formErrors.provinciaRetiro}>{formErrors.provinciaRetiro}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} textAlign={'left'}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Localidad</InputLabel>
                      <Select
                          style={ { fontFamily: 'Rubik, sans-serif' } }
                          label="Localidad"
                          variant='outlined'
                          name='domicilioRetiro.localidad'
                          fullWidth
                          value={formData.domicilioRetiro.localidad}
                          onChange={e => handleInputChange(e)}
                          color={lightBlueColor}
                          error={!!formErrors.localidadRetiro}
                          helperText={formErrors.localidadRetiro}
                          disabled={formData.domicilioRetiro.provincia === ''}
                        >
                          {provincias.find(prov => prov.nombre === formData.domicilioRetiro.provincia)?.localidades.map((localidad) => (
                        <MenuItem key={localidad.id} style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' }} value={`${localidad.nombre}`}>
                          {localidad.nombre}
                        </MenuItem>))}
                      </Select>
                    <FormHelperText error={!!formErrors.localidadRetiro}>{formErrors.localidadRetiro}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} marginY='0.85em'>
                    <TextField
                      label="Referencia (opcional)"
                      variant="outlined"
                      fullWidth
                      multiline
                      name="domicilioRetiro.referencia"
                      value={formData.domicilioRetiro.referencia}
                      onChange={handleInputChange}
                      color={lightBlueColor}
                    />
                  </Grid>
                  <Grid item xs={12} marginY='0.75em'>
                    <TextField
                      label="Fecha de Retiro"
                      variant="outlined"
                      type="date"
                      fullWidth
                      name="fechaRetiro"
                      value={formData.fechaRetiro}
                      onChange={handleInputChange}
                      error={!!formErrors.fechaRetiro}
                      helperText={formErrors.fechaRetiro}
                    />
                    {/* <DatePicker
                      label="Fecha de Retiro"
                      value={dayjs(formData.fechaRetiro)} // Asegúrate de que "dayjs" esté importado y que formData.fechaRetiro sea una fecha válida.
                      onChange={(newValue) => handleInputChange({
                        target: { name: 'fechaRetiro', value: newValue ? newValue.format('YYYY-MM-DD') : '' }
                      })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          error={!!formErrors.fechaRetiro}
                          helperText={formErrors.fechaRetiro}
                        />
                      )}
                    /> */}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontFamily={'Rubik, sans-serif'}>
                Domicilio de Entrega
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Accordion defaultExpanded>
                <AccordionSummary id="panel-header" aria-controls="panel-content" onClick={handleOpenEntrega}>
                  {accordionEntrega ? <KeyboardArrowUpIcon></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                </AccordionSummary>
                <AccordionDetails>
            <Grid item xs={12}>
              <TextField
                label="Calle"
                variant="standard"
                fullWidth
                name="domicilioEntrega.calle"
                value={formData.domicilioEntrega.calle}
                onChange={handleInputChange}
                error={!!formErrors.calleEntrega}
                helperText={formErrors.calleEntrega}
                color={lightBlueColor}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Numero"
                variant="standard"
                fullWidth
                name="domicilioEntrega.numero"
                value={formData.domicilioEntrega.numero}
                onChange={handleInputChange}
                error={!!formErrors.numeroEntrega}
                helperText={formErrors.numeroEntrega}
                color={lightBlueColor}
                type='number'
              />
            </Grid>
                  <Grid item xs={12} textAlign={'left'} marginY={'1em'}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Provincia</InputLabel>
                      <Select
                          style={ { fontFamily: 'Rubik, sans-serif' } }
                          label="Provincia"
                          variant='outlined'
                          name='domicilioEntrega.provincia'
                          fullWidth
                          value={formData.domicilioEntrega.provincia}
                          onChange={e => handleInputChange(e)}
                          color={lightBlueColor}
                          error={!!formErrors.provinciaEntrega}
                        >
                          {provincias.map((prov) => (
                          <MenuItem key={prov.id} style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={`${prov.nombre}`}>{prov.nombre}</MenuItem>))}
                      </Select>
                      <FormHelperText error={!!formErrors.provinciaEntrega}>{formErrors.provinciaEntrega}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} textAlign={'left'}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Localidad</InputLabel>
                      <Select
                          style={ { fontFamily: 'Rubik, sans-serif' } }
                          label="Localidad"
                          variant='outlined'
                          name='domicilioEntrega.localidad'
                          fullWidth
                          value={formData.domicilioEntrega.localidad}
                          onChange={e => handleInputChange(e)}
                          color={lightBlueColor}
                          error={!!formErrors.localidadEntrega}
                          helperText={formErrors.localidadEntrega}
                          disabled={formData.domicilioEntrega.provincia === ''}
                        >
                          {provincias.find(prov => prov.nombre === formData.domicilioEntrega.provincia)?.localidades.map((localidad) => (
                        <MenuItem key={localidad.id} style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' }} value={`${localidad.nombre}`}>
                          {localidad.nombre}
                        </MenuItem>))}
                      </Select>
                    <FormHelperText error={!!formErrors.localidadEntrega}>{formErrors.localidadEntrega}</FormHelperText>
                    </FormControl>
                  </Grid>
            <Grid item xs={12} marginY='0.85em'>
              <TextField
                label="Referencia (opcional)"
                variant="outlined"
                multiline
                fullWidth
                name="domicilioEntrega.referencia"
                value={formData.domicilioEntrega.referencia}
                error={!!formErrors.referenciaEntrega}
                helperText={formErrors.referenciaEntrega}
                onChange={handleInputChange}
                color={lightBlueColor}
                />
            </Grid>
            <Grid item xs={12} marginY='0.75em'>
              <TextField
                  label="Fecha de Entrega"
                  variant="outlined"
                  type="date"
                  fullWidth
                  name="fechaEntrega"
                  value={formData.fechaEntrega}
                  onChange={handleInputChange}
                  error={!!formErrors.fechaEntrega}
                  helperText={formErrors.fechaEntrega}
                  color={lightBlueColor}
                  />
            </Grid>

            </AccordionDetails>
            </Accordion>
            </Grid>
            <Grid item xs={12} >
              <VisuallyHiddenInput setSelectedFile={setSelectedFile} />
            </Grid>
            <Divider />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: '16px',
              backgroundColor: '#6fbe56',
              outline: 'none',
              border: 'none',
              '&:hover': {
                backgroundColor: '#6fbe56',
                filter: 'brightness(1.1)'
              },
              '&:active': {
                outline: 0,
                border: 'none'
              }
            }}
            style={
              {
                fontFamily: 'Rubik, sans-serif',
                fontWeight: '500',
                fontSize: '0.95em'
              }
            }
            fullWidth
          >
            Registrar
          </Button>
          <SimpleBackdrop open={openBackdrop} />
        </form>
      </Paper>
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="confirm-dialog"
      >
        <DialogTitle id="confirm-dialog">Confirmar Pedido de Envio</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            ¿Está seguro que quiere confirmar el Pedido de Envio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
        <DialogTitle id="success-dialog">Registro Exitoso</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <DialogContentText id="success-dialog-description">
            El Pedido de Envio se registró exitosamente.
          </DialogContentText>
          <img src={greenOkImage} style={{ maxWidth: '3em', height: 'auto', marginRight: '1.5em', color: 'green' }} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenSuccess(false)
              navigate('/home')
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openMailSuccess} onClose={() => setOpenMailSuccess(false)}>

  <DialogTitle>Correo enviado</DialogTitle>
  <DialogContent>
    <DialogContentText>
      El correo ha sido enviado correctamente al transportista.
    </DialogContentText>
    <img src={greenOkImage} style={{ maxWidth: '3em', height: 'auto', marginRight: '1.5em', color: 'green' }} />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenMailSuccess(false)} color="primary">
      Cerrar
    </Button>
  </DialogActions>
</Dialog>
      {openError && <AlertaError />}
      {/* <VolverAlInicio /> */}
    </Container>
  )
}

export default FormularioPedidoEnvio