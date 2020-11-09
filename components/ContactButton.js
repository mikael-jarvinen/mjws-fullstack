import React, { useState } from 'react'
import { Fab, Snackbar, IconButton } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import ContactDialog from './ContactDialog'
import { useContactSend } from '../lib/contentService'
import CloseIcon from '@material-ui/icons/Close'


const ContactButton = () => {
  const [dialog, toggleDialog] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const sendContact = useContactSend()

  const handleContactSubmit = ({ email, name, message }) => {
    sendContact({
      email,
      name,
      message
    })
    toggleDialog(!dialog)
    setSnackbarOpen(true)
  }

  return (
    <>
      <Fab
        variant='extended'
        color='primary'
        style={{ 
          position: 'fixed',
          right: '5%',
          bottom: '5%',
          zIndex: 2000
        }}
        onClick={() => toggleDialog(true)}
      >
      Ota yhteyttä
        <MailOutlineIcon/>
      </Fab>
      <ContactDialog
        open={dialog}
        onClose={() => toggleDialog(false)}
        handleSubmit={handleContactSubmit}
      />
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
    </>
  )
}

export default ContactButton