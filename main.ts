

async function updateWeather():Promise<void> {
    const cards:HTMLCollection = document.getElementsByClassName("card");
    const cidades:Element[] = Array.from(cards)
    cidades.forEach( (cidade:Element, index:number) => {
        const temp:Promise<number> = getWeather(cidade)
        cards[index].children[1].textContent = temp.toString()
    });
}

async function getWeather(card: any):Promise<number> {
    const city:object = card.children[0].innerText
    const url:string = `https://npm-proxy-server.onrender.com/api?q=${city}`
    const res:any= await fetch(url)
    const data:any = await res.json()

    if (data.cod != 200) {
        console.error(data.message)
        alert(`Cidade ${city} não existe`)
        return 0
    }else{
        return data.main.temp - 273.15
    }
}   

updateWeather();