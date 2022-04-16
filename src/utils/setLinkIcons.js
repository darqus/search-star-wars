import { FAVICONS } from '../state/index'

const toggleFavicon = (icon) => {
  const headTitle = document.querySelector('head')
  const newFavicon = document.createElement('link')
  newFavicon.setAttribute('rel', 'icon')
  newFavicon.setAttribute('href', icon)
  headTitle.appendChild(newFavicon)
}

const setLinkIcons = (isDark) => {
  const favicon = isDark ? FAVICONS.dark : FAVICONS.light
  toggleFavicon(favicon)
}

export default setLinkIcons
