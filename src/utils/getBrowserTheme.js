import { THEMES } from '../state'

const getBrowserTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.dark : THEMES.light)

export default getBrowserTheme
