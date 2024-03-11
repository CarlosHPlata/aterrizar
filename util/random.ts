
const MOCK_NAMES = ['Carlos', 'Juan', 'Emilio', 'Gary', 'Elias', 'Fernando', 'Giovanni']

const MOCK_PASSPORTS = ['G143327', 'G113125', 'G229108', 'G229101']

function getRandomName(): string {
  return MOCK_NAMES[Math.floor(Math.random() * 10) % MOCK_NAMES.length]
}

function getRandomPassport(): string {
  return MOCK_PASSPORTS[Math.floor(Math.random() * 10) % MOCK_PASSPORTS.length]
}

export default {
  getRandomName,
  getRandomPassport
}
