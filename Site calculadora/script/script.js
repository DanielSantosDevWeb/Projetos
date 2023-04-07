

class Calculadora {
    constructor(tela ) {
        this.tela = tela
        this.valorAtual = ''
        this.valorAnterior = ''
        this.valorTotal = ''
        this.operador = ''
        this.valorDisplay = ''
    }
    
    // Adicionando numero ao valor atual
    adicionarNum(num) {
        
        // verificando se ja existe um . na operação
        if ( tela.textContent.includes('.')) {
            if ( num == '.') {
                return ;
            }
        }
        
        this.valorAtual += num
        
        this.atualizarDisplay(this.valorAtual)
    }
    
    // Atualizando display
    atualizarDisplay(valor) {
        
        // Limitando o tamanho do display
        if ( valor.length > 8) {
            
            console.log('mair');
            this.apagarUmDigito(valor)
            return ;
        }
        
        tela.textContent = valor

    }
    
    // função de adição
    adicao(vAtual, vTotal) {
        
        let v = vAtual
        
        let operacaoValor = vAtual + vTotal
        
        this.valorTotal = operacaoValor
        this.atualizarDisplay(operacaoValor);
        this.valorAtual = ''
    }
    
    // função de diminuição
    diminuicao(vAtual, vTotal) {
        
        // se o valor total for 0 a operação de diminuição nao sera feita
        if ( vTotal == 0) {
            vTotal = vAtual
            this.valorTotal = vTotal
            this.atualizarDisplay(vTotal)
            this.valorAtual = ''
            
        } else {
            let operacaoValor = vTotal - vAtual
            
            this.valorTotal = operacaoValor
            this.atualizarDisplay(operacaoValor);
            this.valorAtual = ''
        }
        
        
    }
    
    // função de multiplicação
    multiplicar(vAtual, vTotal ) {
        
        if ( vTotal === 0) {
            vTotal = 1
        }
        if ( vAtual === 0) {
            vAtual = 1
        }
        
        let operacaoValor = vTotal * vAtual
        
        this.valorTotal = operacaoValor
        this.atualizarDisplay(operacaoValor);
        this.valorAtual = ''
    }
    
    //função de divicao
    dividir(vAtual, vTotal ) {
        
        if (vTotal === 0) {
            
            // verifica se o valor total e '0' para mudar a ordem 'padrao' da divisão
            vTotal = 1
            let total = (vAtual / vTotal).toFixed(2)
            this.valorTotal = total 
            this.atualizarDisplay(total)
            this.valorAtual = ''
            return ;
        }
        
        if (vAtual === 0) {
            
            vAtual = 1
        }
        
        let total = vTotal / vAtual // ordem padrão da divisão
        this.valorTotal = total
        
        this.atualizarDisplay(total)
        this.valorAtual = ''
        
    }
    
    apagarUmDigito(digitosDisplay) {
        if ( digitosDisplay == '') {
            return ;
        } else {
            let ulti =  [...digitosDisplay]
            
            ulti.length = ulti.length - 1
            
            this.valorAtual = ulti.join('')
            this.valorTotal = ''
            
            this.atualizarDisplay(ulti.join(''));
        }
    }

    apagarTudo() {
        tela.textContent = ''
        this.valorAtual = ''
        this.valorTotal = ''
        
    }
    
    // Chamando o tipo de operação
    dogitosOperacao(operacao) {
        
        let operador = this.operador
        let vAtual = Number(this.valorAtual)
        let vTotal = Number(this.valorTotal)
        
        switch (operacao) {
            case '+': 
                
                this.adicao(vAtual, vTotal)
                this.operador = operacao
                
                break
            case '-':
                
                this.diminuicao(vAtual, vTotal)
                this.operador = operacao
                
                break
            case '×': 
                
                this.multiplicar(vAtual, vTotal)
                this.operador = operacao
                
                break
            case '÷':
                
                this.dividir(vAtual, vTotal)
                this.operador = operacao 
                
                break
            case 'C':
                
                this.apagarUmDigito(tela.textContent)
                this.operador = operacao
                
                break
            case 'CE':
                
                this.apagarTudo()
                this.operador = null 
                
                break
            case '=': 
                
                // this.addValorDisplay(vAtual)

                if ( operador == '+') {
                    
                    this.adicao(vAtual, vTotal)
                    
                } else if ( operador == '-'){
                    
                    this.diminuicao(vAtual, vTotal)
                    
                } else if ( operador == '×'){
                    
                    this.multiplicar(vAtual, vTotal)
                    
                } else if ( operador == '÷'){
                    this.dividir(vAtual, vTotal)
                    
                }else {
                    console.log('passou');
                }
        }
    }
    
} 

const buttons = document.querySelectorAll('#botoes .buttons')
const tela = document.getElementById('output')

const cal = new Calculadora(tela)

buttons.forEach((num)=> {
    num.addEventListener('click', (e)=> {
        
        let valor = e.target.value
        
        if (valor <= 9 || valor === '.' ) {
            
            cal.adicionarNum(valor)
            
        } else {
            cal.dogitosOperacao(valor)
        }
    })
})