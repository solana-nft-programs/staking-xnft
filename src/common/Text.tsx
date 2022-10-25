import { Text as XNFTText, useMetadata } from 'react-xnft'

export const Text = ({ ...props }) => {
  const theme = useMetadata()
  return (
    <XNFTText
      {...props}
      style={{ ...props.style, color: theme.isDarkMode ? '#FFF' : '#000' }}
    ></XNFTText>
  )
}
