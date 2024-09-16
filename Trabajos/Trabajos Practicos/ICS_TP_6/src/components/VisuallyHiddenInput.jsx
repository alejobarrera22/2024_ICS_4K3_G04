/* eslint-disable linebreak-style */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'
import { lightBlue } from '@mui/material/colors'
import Alert from '@mui/material/Alert'

const lightBlueColor = lightBlue[500300]
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

InputFileUpload.propTypes = {
  setSelectedFile2: PropTypes.func
}

export default function InputFileUpload ({ setSelectedFile2 }) {
  const [showAlert, setShowAlert] = React.useState('')
  const [selectedFiles, setSelectedFiles] = React.useState([])

  const handleImageChange = (event) => {
    const files = event.target.files
    const acceptedTypes = ['image/jpeg', 'image/png']
    const maxFiles = 4
    const maxTotalSizeMB = 10 * 1024 * 1024 // 10 MB en bytes

    // Calcula el tamaño total de los archivos seleccionados
    const totalSize = [...selectedFiles, ...files].reduce((acc, file) => acc + file.size, 0)

    // Filtra los archivos permitidos
    const newFiles = Array.from(files).filter((file) => {
      const isValidType = acceptedTypes.includes(file.type)
      if (!isValidType) {
        setShowAlert('Solo se permiten imágenes en formato JPG o PNG.')
      }
      return isValidType
    })

    if (newFiles.length + selectedFiles.length > maxFiles) {
      setShowAlert('Solo se pueden subir hasta 4 imágenes.')
      return
    }

    if (totalSize > maxTotalSizeMB) {
      setShowAlert('El tamaño total de las imágenes debe ser menor a 10 MB.')
      return
    }

    if (newFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...newFiles])
      setSelectedFile2([...selectedFiles, ...newFiles])
      setShowAlert('') // Reinicia la alerta si todo está bien
    }
  }

  const handleRemoveImage = (fileToRemove) => {
    const updatedFiles = selectedFiles.filter(file => file !== fileToRemove)
    setSelectedFiles(updatedFiles)
    setSelectedFile2(updatedFiles)
  }

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        color={lightBlueColor}
        sx={{
          '&:hover': {
            backgroundColor: '#4D9FE7'
          }
        }}
        style={{
          fontFamily: 'Rubik, sans-serif',
          fontWeight: '500',
          fontSize: '0.95em'
        }}
        fullWidth
      >
        Cargar imagen
        <VisuallyHiddenInput type="file" onChange={handleImageChange} multiple />
      </Button>
      
      {showAlert && (
        <Alert severity="error" onClose={() => setShowAlert('')}>{showAlert}</Alert>
      )}
      
      {selectedFiles.length > 0 && selectedFiles.map((file, index) => (
        <div key={index}>
          <CloudDoneIcon color="success" />
          <span>{file.name}</span>
          <IconButton onClick={() => handleRemoveImage(file)} variant="outlined">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </>
  )
}