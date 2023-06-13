const prompt = require('prompt-sync')()

// SETS DE COMBINAÇÕES POSSÍVEIS
const combinacoesdeUm = [[1], [2], [3], [4], [5], [6], [7], [8]]
const combinacoesdeDois = [[1, 2], [3, 4], [5, 6], [7, 8], [1,3], [5, 7], [2, 4], [6, 8], [1, 7], [2, 8]]
const combinacoesDeQuatro = [[1, 2, 3, 4], [5, 6, 7, 8], [1, 3, 5, 7], [2, 4, 6, 8], [1, 2, 7, 8], [3, 4, 5, 6]]
const combinacoesDeOito = [[1, 2, 3, 4, 5, 6, 7, 8]]

// PEGANDO O NÚMERO DE LINHAS, VARIÁVEIS E INICIANDO A TABELA VERDADE
const numeroDeVariaveis = Number(prompt("Digite o número de variáveis (2-3): "))
const numeroDeLinhas = numeroDeVariaveis === 2 ? 4 : 8 
const tabelaVerdade = []

// PREENCHENDO O MAPA DE KARNAUGH
console.log("Preencha o mapa de Karnaugh a seguir: ")
for (let linha = 0; linha < numeroDeLinhas; linha++) {
    const valor = Number(prompt(`Digite o valor para a ${linha+1}ª linha do resultado (1 ou 0): `))   
    if (valor === 1) tabelaVerdade.push(linha+1)
}

const agrupamentos = []

// AGRUPANDO OS 1s
// grupos de 8
for (let combinacao of combinacoesDeOito) {
    const combinou = combinacao.every(elemento => tabelaVerdade.includes(elemento))

    if (combinou) {
        agrupamentos.push(combinacao)
        break
    }
}

// grupos de 4
for (let combinacao of combinacoesDeQuatro) {
    const combinou = combinacao.every(elemento => tabelaVerdade.includes(elemento))
    const jaTem = combinacao.every(elemento => {
        return agrupamentos.some(subArray => subArray.includes(elemento))
    })

    if (combinou && !jaTem) {
        agrupamentos.push(combinacao)
        if (numeroDeVariaveis === 2) {
            break
        }
    }
}

// grupos de 2
for (let combinacao of combinacoesdeDois) {
    const combinou = combinacao.every(elemento => tabelaVerdade.includes(elemento))
    const jaTem = combinacao.every(elemento => {
        return agrupamentos.some(subArray => subArray.includes(elemento))
    })

    if (combinou && !jaTem) {
        agrupamentos.push(combinacao)
    }
}

// grupos de 1
for (let combinacao of combinacoesdeUm) {
    const combinou = combinacao.every(elemento => tabelaVerdade.includes(elemento))
    const jaTem = combinacao.every(elemento => {
        return agrupamentos.some(subArray => subArray.includes(elemento))
    })

    if (combinou && !jaTem) {
        agrupamentos.push(combinacao)
    }
}

console.log(agrupamentos)

