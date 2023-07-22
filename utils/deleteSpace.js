export default (data)=>{
    let trimmeData=data.trim()
    let cleanData=trimmeData.replace(/\s+/g," ")
    return cleanData
}