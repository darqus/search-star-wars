export const IS_DEV = process.env.NODE_ENV === 'development'

export const THEMES = {
  light: 'light',
  dark: 'dark',
}

export const FAVICONS = {
  dark: 'darth_vader.png',
  light: 'storm_trooper.png',
}

export const SIDES = {
  light: 'Light',
  dark: 'Dark',
}

export const ROLES = {
  light: 'Jedi',
  dark: 'Sith',
}

export const BGS = {
  light: 'jedi',
  dark: 'sith',
}

export const LINKS = [
  {
    link: 'https://vuetifyjs.com/en/',
    text: 'Vuetify',
  },
  {
    link: 'https://star-wars-api-v3.netlify.app/',
    text: 'API',
  },
  {
    link: 'https://starwars-visualguide.com',
    text: 'Resources',
  },
  {
    link: 'https://starwars.fandom.com/',
    text: 'Wiki',
  },
  {
    link: 'https://meloboom.com/en/tags/star%20wars',
    text: 'Music',
  },
  {
    link: 'https://www.softicons.com/search?search=star+wars&x=13&y=10',
    text: 'Icons',
  },
]

export const AUDIO_ICONS = {
  play: 'mdi-play',
  stop: 'mdi-stop',
}

export const NON_BREAKING_SPACE = String.fromCharCode(160)
