import { diplomasWeb3 } from '@/mocks/DiplomasWeb3.mock'
import { studentsMocks } from '@/mocks/Students.mock'
import { LoadingButton } from '@mui/lab'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

function SendCredential () {
  const [selectedStudent, setSelectedStudent] = useState<Student>({
    firstName: '',
    lastName: '',
    id: '',
    dateOfBirth: '',
    email: '',
    imgBase64: '',
    walletAddress: '',
  })
  const [selectedCredential, setSelectedCredential] = useState<DiplomaWeb3>({
    id: '',
    name: '',
    metadata: '',
    description: '',
    university: '',
  })
  const [metadata, setMetadata] = useState('')
  const [studentWallet, setStudentWallet] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStudentChange = (event: SelectChangeEvent) => {
    const student = studentsMocks.find((student) => student.id === event.target.value)
    if (!student) return
    setSelectedStudent(student)
  }

  const handleCredentialChange = (event: SelectChangeEvent) => {
    const diploma = diplomasWeb3.find((diploma) => diploma.id === event.target.value)
    if (!diploma) return
    setMetadata(diploma.metadata)
    setSelectedCredential(diploma)
  }

  const handleSendCredential = async () => {
    setLoading(true)
    console.log('Sending credential')
    console.log('Student wallet', studentWallet)
    console.log('Student', selectedStudent)
    console.log('Credential', selectedCredential)
    console.log('Metadata', metadata)
    setLoading(false)
  }

  return (
    <Stack>
      <Typography variant='h1' sx={{ fontSize: '3rem', fontWeight: 'bold', color: 'primary.main' }}>Send Credential</Typography>
      <Stack
        gap={4}
        justifyContent='center'
        alignItems='center'
        width={500}
      >
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Credential</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedCredential.id}
            label='Credential'
            onChange={handleCredentialChange}
          >
            {diplomasWeb3.map((diploma) => (<MenuItem key={diploma.id} value={diploma.id}>{diploma.name}</MenuItem>))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Student</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedStudent.id}
            label='Student'
            onChange={handleStudentChange}
          >
            {studentsMocks.map((student) => (<MenuItem key={student.id} value={student.id}>{`${student.firstName} ${student.lastName}`}</MenuItem>))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Student Wallet'
          value={studentWallet}
          onChange={(e) => setStudentWallet(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label='Metadata'
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
        />
        <LoadingButton
          variant='contained'
          loading={loading}
          onClick={handleSendCredential}
        >
          Send Credential
        </LoadingButton>
      </Stack>

    </Stack>
  )
}

export default SendCredential
