import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useQuery, useApolloClient, useMutation } from '@apollo/client'
import { WHOAMI, CONTACT } from '../libs/queries'
import { Form } from 'informed'
import TextInput from './TextInput'
import EmailValidator from 'email-validator'

const TopBar = () => {
  const [dialog, toggleDialog] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const {data} = useQuery(WHOAMI)
  const [sendContact] = useMutation(CONTACT)
  const client = useApolloClient()

  const handleLogout = () => {
    window.localStorage.clear()
    client.writeQuery({
      query: WHOAMI,
      data: {
        whoami: {
          __ref: ''
        }
      }
    })
  }

  const handleContactSubmit = ({ email, name, message }) => {
    sendContact({
      variables: {
        email,
        name,
        message
      }
    })
    toggleDialog(!dialog)
    setSnackbarOpen(true)
  }

  const validateEmail = value => {
    if (!value || !EmailValidator.validate(value)) {
      return 'Virheellinen sähköpostiosoite'
    }
  }

  const validateName = value => {
    if (!value || value.length < 9) {
      return 'Nimen täytyy olla pitempi kuin 8 kirjainta'
    }
  }

  const validateMessage = value => {
    if (!value || value.length < 10) {
      return 'Viestin tulee olla vähintään 10 kirjainta pitkä'
    }
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box color='white'>
            <Button
              variant='outlined'
              color='inherit'
              onClick={() => toggleDialog(!dialog)}
            >
              ota yhteyttä
            </Button>
          </Box>
          {snackbarOpen ?
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              open={snackbarOpen}
              autoHideDuration={8000}
              onClose={() => setSnackbarOpen(false)}
              message='Yhteydenotto lähetetty'
              action={
                <>
                  <IconButton
                    size='small'
                    aria-label='close'
                    onClick={() => setSnackbarOpen}
                  >
                    <CloseIcon fontSize='small'/>
                  </IconButton>
                </>
              }
            /> : null}
          {dialog ?
            <Dialog
              open={dialog}
              onClose={() => toggleDialog(!dialog)}
              aria-labelledby='contact-form-dialog-title'
            >
              <DialogTitle id='contact-form-dialog-title'>
                Ota yhteyttä
              </DialogTitle>
              <Form
                onSubmit={handleContactSubmit} 
                aria-labelledby='contact-form-dialog-title'
              >
                <DialogContent>
                  <DialogContentText>
                    Ota yhteys lähettämällä sähköpostia
                  </DialogContentText>
                  <Box>
                    <Box display='flex'>
                      <Box marginRight={2}>
                        <TextInput
                          field='email'
                          label='sähköposti'
                          variant='filled'
                          validate={validateEmail}
                        />
                      </Box>
                      <TextInput
                        field='name'
                        label='nimi'
                        variant='filled'
                        validate={validateName}
                      />
                    </Box>
                    <Box marginTop={2}>
                      <TextInput
                        field='message'
                        label='viesti'
                        variant='filled'
                        multiline
                        rows={3}
                        fullWidth
                        validate={validateMessage}
                      />
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Box margin={2}>
                    <Button type='submit'>
                      lähetä
                    </Button>
                  </Box>
                </DialogActions>
              </Form>
            </Dialog>: null}
          {data && data.whoami.username !== '' ?
            <Box display='flex' flexGrow={1}>
              <Box
                display='flex'
                flexGrow={1}
                justifyContent='center'
              >
                <Typography variant='h6'>Logged in as {data.whoami.username}</Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='row-reverse'
                color='white'
              >
                <Button
                  color='inherit'
                  onClick={handleLogout}
                  variant='outlined'
                >
                  logout
                </Button>
              </Box>
            </Box>
            : null}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  )
  // we are rendering an empty toolbar after app bar, so that
  // we wont render any items behind appbar
}

export default TopBar