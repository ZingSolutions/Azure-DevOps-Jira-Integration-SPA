
    async function fetchData(items:any) {
        const res = await fetch("http://localhost:7071/api/URLValidation", {
            method: "POST",
            body: JSON.stringify(items)
        })
        return res.ok;        
    }

export default fetchData