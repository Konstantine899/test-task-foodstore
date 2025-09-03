import React from 'react'

interface IconProps {
    name: string
}

export const Icon :React.FC<IconProps> = ({name}) => {
  return (
    <div>Icon</div>
  )
}