export const getData = async(url,renderFc)=>{
    const response = await fetch(url)
    const data=await response.json()
    renderFc(data)
}