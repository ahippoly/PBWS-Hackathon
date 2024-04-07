import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow, Paper, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MoodleLogo from '@/assets/img/Moodle-logo.svg.png'

function ConnectToThirdParty () {
  const [loadingConnectVerification, setLoadingConnectVerification] = useState(false)
  const [hasBeenVerified, setHasBeenVerified] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleOpenPopUp = () => {
    setOpen(true)
    console.log('Connect to third party')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConnect = () => {
    setLoadingConnectVerification(true)
    setTimeout(() => {
      setLoadingConnectVerification(false)
      setHasBeenVerified(true)
    }, 1000)
  }

  useEffect(() => {
    if (hasBeenVerified) {
      setTimeout(() => {
        navigate('/provider/create')
        setHasBeenVerified(false)
      }, 4000)
    }
  }, [hasBeenVerified])

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries((formData as any).entries())
            const email = formJson.email
            console.log(email)
            handleClose()
          },
        }}
      >
        <DialogTitle>Moodle access informations</DialogTitle>
        <Grow in={!hasBeenVerified}>
          <Box>
            <DialogContent>
              <DialogContentText>
                In order to generate your credentials, you need to provide your moodle api base url and an access token
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin='dense'
                name='url'
                label='Moodle api base url'
                fullWidth
                variant='standard'
              />
              <TextField
                autoFocus
                required
                margin='dense'
                name='url'
                label='Moodle access token'
                fullWidth
                variant='standard'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton loading={loadingConnectVerification} variant='contained' onClick={handleConnect}>Connect</LoadingButton>
            </DialogActions>
          </Box>
        </Grow>
        <Grow
          in={hasBeenVerified}
          timeout={500}
        >
          <DialogContent
            sx={{
              position: 'absolute',
              translate: '-50% -50%',
              top: '50%',
              left: '50%',
            }}
          >
            <Alert
              severity='success'
              sx={{
                width: 500,
              }}
            >
              <AlertTitle>Success</AlertTitle>
              Your access informations have been successfully verified
              <br /><br />
              You will be redirected to the next step
            </Alert>
          </DialogContent>
        </Grow>
      </Dialog>
      <Paper
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: 800,
          margin: 'auto',
          marginTop: 10,
        }}
      >
        <img src={MoodleLogo} alt='moodle logo' style={{ height: '100px' }} />
        <Typography variant='h4'>Connect to Moodle in one click
          <br /> Generate Credentials
        </Typography>
        <Typography variant='h4' />

        <Stack
          direction='row'
          gap={3}
        >
          <LoadingButton
            loading={loadingConnectVerification}
            onClick={handleOpenPopUp}
            variant='contained'
          >
            Connect to Moodle
          </LoadingButton>

          <LoadingButton
            variant='outlined'
          >
            learn more
          </LoadingButton>
        </Stack>

      </Paper>

    </Box>

  )
}

export default ConnectToThirdParty
