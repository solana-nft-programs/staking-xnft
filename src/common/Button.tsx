import { Button as XNFTButton, useMetadata } from 'react-xnft'
import { dark3 } from '../config/colors'

export const Button = ({ ...props }) => {
  const { isDarkMode } = useMetadata()
  return (
    <XNFTButton
      {...props}
      style={{
        background: dark3(isDarkMode),
        color: isDarkMode ? '#FFF' : '#000',
        ...props.style,
      }}
    />
  )
}
