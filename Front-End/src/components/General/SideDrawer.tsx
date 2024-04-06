import { Avatar, Stack, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import BackupIcon from '@mui/icons-material/Backup'
import SideMenuItem from './SIdeMenuItem'
import { useState } from 'react'

const menuItems = [
  {
    icon: <HomeIcon fontSize='large' />,
    label: 'Home',
    path: '/',
  },
  {
    icon: <ColorLensIcon fontSize='large' />,
    label: 'Create',
    path: '/create',
  },
  {
    icon: <BackupIcon fontSize='large' />,
    label: 'Provide',
    path: '/provider/create',
  },
]

function SideDrawer () {
  const [selectedIcon, setSelectedIcon] = useState('')
  return (
    <Stack
      gap={3}
      p={3}
    >
      {menuItems.map((item, index) => (
        <SideMenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          path={item.path}
          setSelectedIcon={setSelectedIcon}
          selectedIcon={selectedIcon}
        />))}

    </Stack>
  )
}

export default SideDrawer
