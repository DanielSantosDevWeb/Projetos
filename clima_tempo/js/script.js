
class OpenWhearth {
    constructor(cidade , estado) {
        this.cidadeInput = cidade
        this.estadoInput = estado
        this.key = 'b1cc7b670b0d8f311e70ffc7a7773b98'
    }
    
    async cordenadas() {
        try {

            const infosCityJson = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.cidadeInput},${this.estadoInput}&limit=3&appid=${this.key}`)
    
            const cityObj = await infosCityJson.json()
            
            this.pais   = cityObj[0].country
            this.estado = cityObj[0].state
            this.cidade = cityObj[0].name
            this.lat    = cityObj[0].lat
            this.lon    = cityObj[0].lon
            
            return { lat: this.lat , lon: this.lon}
            
        } catch (e) {
            console.log(' DEU RUIM NA API DE CORDENADAS');
        }
    }
    
    async dadosClimaticos() {
        try {
            await this.cordenadas()
            
            const climaJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.key}&units=metric&lang=pt_br`)
            
            const climaObj = await climaJson.json()
                
            const dadosClimaticos = {
                temp    : climaObj.main.temp, 
                umidade : climaObj.main.humidity, 
                iconId    : climaObj.weather[0].icon, 
                descricao : climaObj.weather[0].description, 
                vento   : climaObj.wind.speed,
                cidade  : this.cidade, 
                estado  : this.estado, 
                pais    : this.pais, 
                
            }
            
            return dadosClimaticos
            
        } catch (e) {
            
            console.error('DEU RUIM NOS DADOS CLIMATICOS \n' + e)
        }
    }
}

const atualizarImg = function( iconId ) {
    
    const img = document.querySelector('.tempImg')
    
    img.src = `https://openweathermap.org/img/wn/${ iconId }@2x.png`
}

const atualizarCidade = function( cidade, estado, pais ) {
    
    const localName = document.querySelector('#localName')
    
    localName.textContent = ` ${ cidade }, ${ estado }, ${ pais } `
}

const atualizarTemperatura = function( temp ) {
    
    const tempInput = document.querySelector('#tempNumber')
    
    tempInput.textContent = ` ${ temp.toFixed(1) }° `
}

const atualizarDesc = function( desc ) {
    
    const descricao = document.querySelector('.climaName')
    
    descricao.textContent = desc
}

const adicionarData = function( data ) {

    const dataNumber = document.querySelector('#dataNumber')

    dataNumber.textContent = ` ${data[0] } / ${data[1] } / ${data[2] } `
}

const atualizarTexto = function( umidade, vento ) {
    
    const texto = document.querySelector('.text')
    
    texto.innerHTML = `Hoje a umidade esta em ${umidade} <br><br> 
    Ventos de ate ${vento}m/s`
}

const aparecerConteudo = function(  ) {

    const conteudo = document.querySelector('.conteudo')

    conteudo.style.height = '350px'
}

const sumirConteudo = function(  ) {
    
    const conteudo = document.querySelector('.conteudo')

    conteudo.style.height = '0px'
}

const sumirInputText = function(  ) {
    
    const localInput = document.querySelector('.localInput')

    localInput.style.minWidth = '0px'

    localInput.style.width = '0px'

    aparecerConteudo()
    
}

const aparecerInputText = function(  ) {
    
    const localInput = document.querySelector('.localInput')

    localInput.style.width = '400px'
}

const atualizarData = function(  ) {

    const dataInfos = new Date()

    const dia = dataInfos.getDate()

    const mes = dataInfos.getMonth() + 1

    const ano = dataInfos.getFullYear()

    adicionarData([dia, mes, ano])
    
}

const atualizarDisplay = function(dataBase) {
    
    //Destructuring no meu obj dataBase
    let {
        cidade   , 
        estado   , 
        pais     , 
        temp     , 
        descricao , 
        umidade  , 
        vento    , 
        iconId     , 
    } = dataBase
    
    //Chamando cada função com dados ja separados
    atualizarImg( iconId )
    
    atualizarCidade( cidade, estado, pais)
    
    atualizarTemperatura( temp )
    
    atualizarDesc( descricao )
    
    atualizarTexto( umidade, vento )

    atualizarData(  )
    
}

// função q inicia todo meu código

const buscarCidade = function() {
    
    const cidade = document.querySelector('#cidade').value
    const estado = document.querySelector('#estado').value
    
    const apiOpenW = new OpenWhearth(cidade , estado )
    
    sumirInputText()
    aparecerConteudo()
    
    const dadosClimaticos = apiOpenW.dadosClimaticos().then( (e)=> {
        
        atualizarDisplay(e)
    } )
}

const editarCidade = function() {
    
    aparecerInputText()
    sumirConteudo()
}

const enter = function(e) {

    e.code === 'Enter' ? buscarCidade() : null 
    
    console.log(e);
    
}

const locais = document.querySelectorAll('.local')

const btnEdit = document.querySelector('#edit')

const btnBuscar = document.querySelector('#buscar')

locais.forEach( (e)=> {
    e.addEventListener('keypress', enter)
} )

btnBuscar.addEventListener('click', buscarCidade)

btnEdit.addEventListener('click', editarCidade)

