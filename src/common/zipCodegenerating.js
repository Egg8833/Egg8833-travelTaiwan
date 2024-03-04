import ZipCode from '../assets/data/zipCode.json'

export default function generateZipCode() {
  const zipCode = []
  for (const city in ZipCode) {
    zipCode.push(ZipCode[city])
  }
  return zipCode
}
