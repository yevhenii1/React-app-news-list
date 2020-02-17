export const required = (value) => {
    if (value) return undefined
    return '* Поле, обязательное для заполнения'
}

export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) return `* Обязательное поле и должно быть более ${minLength} символов`
    return undefined
}

