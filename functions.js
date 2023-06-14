const variablesObject2Variables = {
    "1": "~A ~B",
    "2": "~A B",
    "3": "A B",
    "4": "A ~B",
}

const variablesObject3Variables = {
    "1": "~A ~B ~C",
    "2": "~A ~B C",
    "3": "~A B C",
    "4": "~A B ~C",
    "5": "A B ~C",
    "6": "A B C",
    "7": "A ~B C",
    "8": "A ~B ~C",
}


function convertNumberToVariable(agrupamentos, numeroDeVariaveis) {
    let agrupamentosDeVariaveis = ''
    const expressoesSimplificadas = []
    const objetoASerComparado = numeroDeVariaveis === 2 ? variablesObject2Variables : variablesObject3Variables


    agrupamentos.forEach((agrupamento, index) => {
        for (let key in objetoASerComparado) {
            if (agrupamento.includes(Number(key))) {
                agrupamentosDeVariaveis += objetoASerComparado[key] + " "
            }
        }
        expressoesSimplificadas.push(simplificarExpressao(agrupamentosDeVariaveis))
        agrupamentosDeVariaveis = ''
    })

    return expressoesSimplificadas
}

function simplificarExpressao(agrupamentosDeVariaveis) {
    const valoresDeAgrupamento = agrupamentosDeVariaveis.split(" ")
    const valoresASeremRemovidos = []
    let expressaoFinal = ''
    valoresDeAgrupamento.forEach(valorPrimario => {
        valoresDeAgrupamento.forEach(valorSecundario => {
            if (valorPrimario == "~" + valorSecundario || "~" + valorPrimario == valorSecundario) {
                valoresASeremRemovidos.push(valorPrimario)
                valoresASeremRemovidos.push(valorSecundario)
            }
        })
    })

    expressaoFinal = valoresDeAgrupamento.filter(valor => !valoresASeremRemovidos.includes(valor) && valor !== '')
    expressaoFinal = [...new Set(expressaoFinal)]

    return expressaoFinal
}

module.exports = convertNumberToVariable