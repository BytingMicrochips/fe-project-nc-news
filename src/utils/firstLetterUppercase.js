export const firstLetterUppercase = (wordArr)=>{
    return wordArr.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase()
        const restLetters = word.slice(1)
        return firstLetter+restLetters
    }) 
}
