import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { diplomas } from '@/mocks/Diplomas.mock'
import { universities } from '@/mocks/University.mock'
function CreateCredentials () {
  const [selectedUniversity, setSelectedUniversity] = useState<University>({
    name: '',
    id: '',
    description: '',
  })
  const [selectedCredential, setSelectedCredential] = useState<CredentialDiploma>({
    name: '',
    metadata: '',
    university: '',
    description: '',
    id: '',
  })
  const [metadata, setMetadata] = useState<string>('')

  const handleUniversityChange = (event: SelectChangeEvent) => {
    const university = universities.find((university) => university.id === event.target.value)
    if (!university) return
    setSelectedUniversity(university)
  }

  const handleCredentialChange = (event: SelectChangeEvent) => {
    console.log('🚀 ~ handleCredentialChange ~ event:', event)
    const diploma = diplomas.find((diploma) => diploma.id === event.target.value)
    if (!diploma) return
    setMetadata(diploma.metadata)
    setSelectedCredential(diploma)
  }

  return (
    <Stack
      gap={8}
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='h1' sx={{ fontSize: '3rem', fontWeight: 'bold', color: 'primary.main' }}>Create Credentials</Typography>
      <Stack
        gap={4}
        justifyContent='center'
        alignItems='center'
        width={500}
      >
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>University</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedUniversity.id}
            label='University'
            onChange={handleUniversityChange}
          >
            {universities.map((university) => (<MenuItem key={university.id} value={university.id}>{university.name}</MenuItem>))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Credential</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedCredential.id}
            label='Credential'
            onChange={handleCredentialChange}
          >
            {diplomas.map((diploma) => (
              <MenuItem key={diploma.id} value={diploma.id}>{diploma.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='Metadata'
          multiline
          rows={4}
          variant='outlined'
          value={metadata}
          onChange={(event) => setMetadata(event.target.value)}
          fullWidth
        />

        <LoadingButton
          variant='contained'
        >
          Mint
        </LoadingButton>
      </Stack>
    </Stack>
  )
}

export default CreateCredentials
