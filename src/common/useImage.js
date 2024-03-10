export function getImagePath(path) {
  return new URL(`/src/assets/images/${path}`, import.meta.url)
}

export default {
  getImagePath,
}
