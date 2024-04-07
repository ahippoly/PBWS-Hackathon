import { Avatar, Stack, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import BackupIcon from '@mui/icons-material/Backup'
import SideMenuItem from './SIdeMenuItem'
import { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'

const menuItems = [
  {
    icon: <LoginIcon fontSize='large' />,
    label: 'Connect',
    path: '/provider/connect',
  },
  {
    icon: <FileUploadIcon fontSize='large' />,
    label: 'Mint',
    path: '/provider/create',
  },
  {
    icon: <FolderCopyIcon fontSize='large' />,
    label: 'Manage',
    path: '/provider/summary',
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
