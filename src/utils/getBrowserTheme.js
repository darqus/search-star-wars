import { THEMES } from './constants'

export const getBrowserTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.dark : THEMES.light
