export default (data) => {
    if (data) {
        return data.replace(/\s+/g, ' ')
    }
}