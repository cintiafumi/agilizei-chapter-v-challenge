import Chance from 'chance'

const chance = new Chance()

export const randomTitle = () => `${chance.word()} ${new Date().getTime()}`

export const randomDescription = () => chance.sentence()

export const randomBody = () => chance.paragraph()

export const randomTags = () => [chance.word(), chance.word()]
