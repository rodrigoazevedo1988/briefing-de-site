const STORAGE_KEY = 'briefing-de-site-data'
const THEME_KEY = 'briefing-de-site-theme'

export const saveData = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

export const loadData = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : null
  } catch { return null }
}

export const clearData = () => {
  try { localStorage.removeItem(STORAGE_KEY) } catch {}
}

export const saveTheme = (theme) => {
  try { localStorage.setItem(THEME_KEY, theme) } catch {}
}

export const loadTheme = () => {
  try { return localStorage.getItem(THEME_KEY) } catch { return 'light' }
}
