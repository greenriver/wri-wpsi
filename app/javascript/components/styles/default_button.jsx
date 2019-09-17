import styleVariables from './variables'

const defaultButtonStyle = (solid=true) => {
  const vars = styleVariables()
  const { colors } = vars
  return {
    display: 'flex',
    alignItems: 'center',
    color: solid ? '#FFFFFF' : colors.links.default,
    backgroundColor: solid ? colors.links.default :  '#FFFFFF',
    border: '1px solid ${colors.links.default}',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: 14,
    lineHeight: 16/14,
    fontFamily: 'PT Sans, Helvetica, Arial, sans-serif',
    letterSpacing: '.05em',
    cursor: 'pointer',
  }
}

export default defaultButtonStyle
