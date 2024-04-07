import { Avatar, Checkbox, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { diplomas } from '@/mocks/Diplomas.mock'
import { universities } from '@/mocks/University.mock'
import { studentsMocks } from '@/mocks/Students.mock'
import { SendSOLToRandomAddress } from '@/components/Web3Related/SendToRandomAddress'
import { SendTransaction } from '@/components/Web3Related/SendTransaction'

function CreateCredentials () {
  const [allDiplomas, setAllDiplomas] = useState<CredentialDiploma[]>(diplomas)

  const [selectedUniversity, setSelectedUniversity] = useState<University>({
    name: '',
    id: '',
    description: '',
    imgBase64: '',
  })
  const [selectedCredential, setSelectedCredential] = useState<CredentialDiploma>(allDiplomas[0])
  const [metadata, setMetadata] = useState<string>('')
  const [checkedDiplomas, setCheckedDiplomas] = useState(diplomas.map((diploma) => diploma.id))
  const [checkedStudents, setCheckedStudents] = useState(studentsMocks.map((student) => student.id))

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

  const handleToggleDiploma = (value: string) => () => {
    const currentIndex = checkedDiplomas.indexOf(value)
    const newChecked = [...checkedDiplomas]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setCheckedDiplomas(newChecked)
  }

  const handleSelectDiploma = (diploma: CredentialDiploma) => {
    setSelectedCredential(diploma)
  }

  const handleToggleStudent = (studentId: string) => () => {
    const currentIndex = checkedStudents.indexOf(studentId)
    const newChecked = [...checkedStudents]
    console.log('🚀 ~ handleToggleStudent ~ newChecked:', newChecked)

    if (currentIndex === -1) {
      newChecked.push(studentId)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setCheckedStudents(newChecked)
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
        width={600}
        direction='row'
      >
        <Stack justifyContent='center' alignItems='center'>
          <Typography variant='h5'>Diplomas</Typography>
          <List
            dense
            sx={{ maxWidth: 360, bgcolor: 'background.paper', height: '100%', overflow: 'auto' }}
            disablePadding
          >
            {allDiplomas.map((diploma) => (
              <ListItem
                sx={{ height: 100 }}
                key={diploma.id}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggleDiploma(diploma.id)}
                    checked={checkedDiplomas.indexOf(diploma.id) !== -1}
                  />
            }
              >
                <ListItemButton
                  onClick={() => handleSelectDiploma(diploma)}
                >
                  <ListItemText>

                    {diploma.name}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack justifyContent='center' alignItems='center'>
          <Typography variant='h5'>Students that have {selectedCredential.name}</Typography>
          <List
            disablePadding
            sx={{ maxWidth: 360, bgcolor: 'background.paper', maxHeight: 500, overflow: 'auto' }}
          >
            {selectedCredential.students.map((student) => (
              <ListItem
                key={student.id}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggleStudent(student.id)}
                    checked={checkedStudents.indexOf(student.id) !== -1}
                  />
            }
              >

                <ListItemAvatar>
                  <Avatar src={student.imgBase64} alt={`${student.firstName} ${student.lastName}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${student.firstName} ${student.lastName}`}
                  secondary={
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{ display: 'block' }}
                      color='text.secondary'
                      noWrap
                    >
                      {student.walletAddress}
                    </Typography>
                }
                />
              </ListItem>
            ))}
          </List>
        </Stack>

      </Stack>

      <SendTransaction />

    </Stack>
  )
}

export default CreateCredentials
