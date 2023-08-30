import { useEffect } from "react"

 const Client = ()=>{
    useEffect(()=>{
        localStorage.setItem('baseURL',"https://sanathanjeevan.loophole.site/")
    },[])

    return <></>
}
export default Client;