function capitalizeFirstLetter(string) {
    const regex = /[-`~!@#$%^&*_|=?;:'",<>]/gi;

    const first_word = string.charAt(0).toUpperCase();
    const new_word = `${first_word}${string.slice(1)?.split(regex)?.join(' ')}`;

    const split_word = new_word.split(' ');

    for (let i = 0; i < split_word.length; i += 1) {
        const first_split_word = split_word[i].charAt(0).toUpperCase();
        split_word[i] = `${first_split_word}${split_word[i].slice(1)}`;
    }

    const result = split_word.join(' ');

    return result;
}



module.exports = {
    capitalizeFirstLetter,
};
