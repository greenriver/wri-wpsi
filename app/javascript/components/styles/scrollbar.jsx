import styleVariables from 'components/styles/variables'

const scrollBarStyle = (size=12) => {
  const { colors } = styleVariables()

  return {
    '&::-webkit-scrollbar': {
      width: size,
    },
    '&::-webkit-scrollbar-track': {
      background: colors.gray3
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.accent,
      cursor: 'pointer',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: colors.accent,
    },
  }
}

export default scrollBarStyle
