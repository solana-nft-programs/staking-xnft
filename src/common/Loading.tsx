import { useMetadata, View } from 'react-xnft'

export const Loading = ({ size }: { size: number }) => {
  const theme = useMetadata()
  return (
    <View
      style={{
        margin: `0px auto`,
        borderRadius: '6px',
        height: `${size * 1.25}px`,
        width: `${size * 4}px`,
        background: theme.isDarkMode ? '#222' : '#CCC',
      }}
    />
  )
}

export const loadingColor = (isDarkMode?: boolean) =>
  isDarkMode ? '#222' : '#CCC'
