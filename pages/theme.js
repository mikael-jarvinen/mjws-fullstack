import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#48B56F'
    },
    primary: {
      main: '#3063B0'
    }
  }
})

const responsiveTheme = responsiveFontSizes(
  theme
)

export default responsiveTheme