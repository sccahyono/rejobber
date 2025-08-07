export function getInitials(name: string): string {
  if (!name) return ''

  // Split by spaces and filter empty entries
  const words = name.trim().split(/\s+/)

  // Get the first character of each word
  const initials = words.map(word => word[0].toUpperCase()).join('')

  return initials
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}