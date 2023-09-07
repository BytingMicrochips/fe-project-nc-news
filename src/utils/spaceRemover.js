export const spaceRemover = (inputArr) => {
    const notSpace = /^[A-Za-z]+$/;
    const lettersNoSpaces = inputArr.map((string) => {
        if (string.split(' ').length === 1) {
            return string
        } else {
            const lettersArr = string.split("");
            const spacesRemoved = lettersArr.filter((letter) => {
                if (notSpace.test(letter)) {
                    return letter
                }
            })
            return spacesRemoved.join('')
        }
    })
    return lettersNoSpaces;
}
