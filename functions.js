const variablesObject2Variables = {
    "1": "~A ~B",
    "2": "~A B",
    "3": "A ~B",
    "4": "A B"
}


function convertNumberToVariable(agrupamentos) {
    let agrupamentosDeVariaveis = ''

    agrupamentos.forEach((agrupamento, index) => {
        for (let key in variablesObject2Variables) {
            if (agrupamento.includes(Number(key))) {
                agrupamentosDeVariaveis += variablesObject2Variables[key] + " "
            }
        }
    })

    return simplificarExpressao(agrupamentosDeVariaveis)
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