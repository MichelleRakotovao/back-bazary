export default (fullname) => {
    fullname = fullname.trim()
    fullname = fullname.replace(/\s+/g, " ")
    return fullname
}