import { Avatar, Button, Stack, Typography } from '@mui/material'
import './SideMenuItem.scss'
import { NavLink } from 'react-router-dom'

function SideMenuItem (
  {
    icon,
    label,
    path,
    selectedIcon,
    setSelectedIcon,
  }: {
        icon: React.ReactNode
        label: string
        path: string
        selectedIcon?: string
        setSelectedIcon?: (icon: string) => void
    },

) {
  const handleClick = () => {
    if (!setSelectedIcon) return
    setSelectedIcon(label)
  }

  return (
    <NavLink
      onClick={handleClick}
      to={path} className='side-menu-item'
    >
      <Stack
        className='side-menu-item'
        alignItems='center'
        sx={{ color: window.location.pathname === path ? 'text.primary' : 'text.secondary' }}
      >
        {icon}
        <Typography>{label}</Typography>
      </Stack>
    </NavLink>
  )
}

export default SideMenuItem
