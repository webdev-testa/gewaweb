const TOKEN_KEY = "gewa_admin_token"
const MOCK_PASSWORD = "gewa2024"

export function login(_email: string, password: string): boolean {
  if (password === MOCK_PASSWORD) {
    localStorage.setItem(TOKEN_KEY, "true")
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return typeof window !== "undefined" && Boolean(localStorage.getItem(TOKEN_KEY))
}
