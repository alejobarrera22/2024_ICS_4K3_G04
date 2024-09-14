import AppBar from '@mui/material/AppBar'
import { Box, Hidden, useMediaQuery, useTheme } from '@mui/material'
import image from '../assets/tango-app-logo.svg'
import userIcon from '../assets/user.svg'

const Header = () => {
  const theme = useTheme()
  const mediaQuery = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: 'rgb(106,188,249)',
        background:
          'linear-gradient(336deg, rgba(106,188,249,1) 5%, rgba(117,191,249,1) 52%, rgba(135,230,255,1) 94%)',
        height: '4em',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 1em',
        alignItems: 'center'
      }}
    >
      <Box display='flex' alignItems='center' paddingRight='1em' sx={ mediaQuery ? { marginLeft: '45%' } : { marginLeft: '0', marginRight: 'auto' } }>
      <div style={ { position: 'absolute', width: '5em', height: '45px', marginLeft: '1.5em', backgroundColor: '#ffffff', borderRadius: '50%', zIndex: -1 } } />
        <img
          alt='tangoAppLogo'
          src={image}
          style={ { maxWidth: '130px', height: 'auto', color: 'darkgrey' } }
        />
      </Box>
      <Box display='flex' alignItems='center' marginRight='12.5%'>
        <Hidden smDown>
          <Box
            marginRight='1em'
            fontFamily={'Rubik, sans-serif'}
            fontSize='0.85em'
            color='#333333'
            fontWeight={'bold'}
          >
            {'¡Bienvenido Usuari@!'}
          </Box>
        </Hidden>
        <img
          alt='user'
          src={userIcon}
          style={{ maxWidth: '3em', height: 'auto', color: 'darkgrey' }}
        />
      </Box>
    </AppBar>
  )
}
export default Header
