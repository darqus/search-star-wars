import { THEMES } from '../state/'

export const getBrowserTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.dark : THEMES.light
