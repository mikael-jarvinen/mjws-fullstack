import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import { Form } from 'informed'
import TextInput from './TextInput'
import EmailValidator from 'email-validator'

const ContactDialog = ({ open, onClose, handleSubmit }) => {
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
      {open ?
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby='contact-form-dialog-title'
        >
          <DialogTitle id='contact-form-dialog-title'>
          Ota yhteyttä
          </DialogTitle>
          <Form
            onSubmit={handleSubmit} 
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
    </>
  )
}

export default ContactDialog