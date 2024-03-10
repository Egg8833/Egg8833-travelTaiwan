export function getImagePath(path) {
  let empty = '/src/assets/images/empty-img.png'

  if (path[0].startsWith('http') || path[0].startsWith(empty)) {
    return path
  }

  return new URL(`/src/assets/images/${path}`, import.meta.url)
}

export default {
  getImagePath,
}
