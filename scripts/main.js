//alunos: Kenji Sousa (00255114) e Willian Fedel (00249931)

//Quando o usuário seleciona outro problema, oculta as divs de todos os problemas, e exibe apenas o problema correspondente ao botão clicado
$(document).on("change", 'input:radio[name="btProblema"]', function (event) {
    let nrProblema = event.target.id.slice(10);
    $(".problema").hide();
    $(`.problema#p${nrProblema}`).show();
});

//Alguns navegadores não suportam "," para números quebrados. Essa função torna isso possível com campos de texto, validando via JS
$(".floatBR").on("keypress", function (event) {
    let currentValue = event.target.value;

    //Só permite digitar 0-9 ou "."/","
    let char = String.fromCharCode(event.which);
    if (!char.match(/[0-9\.,\-]/)
        //Se tiver símbolo de negativo, não permite digitar números à esquerda
        || (currentValue.includes("-") && event.target.selectionStart == 0)) {
        event.preventDefault();
        return;
    };

    //Símbolo negativo
    if (String.fromCharCode(event.which) == '-') {
        if (!(event.target.getAttribute("negative") == "true") //Só se tiver o atributo negative="true"
            || event.target.selectionStart > 0 //Só pode ficar no começo do campo
            || currentValue.includes("-")) { //Terá no máximo 1 ocorrência
            event.preventDefault();
        }
    }

    //Se já houver "."/",", não permite digitar novamente 
    if (currentValue.match(/[,\.]/) && char.match(/[,\.]/)) event.preventDefault();
});

//Funciona para os inputs .floatBR, retorna um valor float
function getFloatFromInput(selector) {
    return parseFloat($(selector).val().replace(",", "."));
}

//Tratamento JS para campos de texto que devem suportar apenas números inteiros não negativos
$(".intBR").on("keypress", function (event) {
    //Só permite digitar 0-9
    let char = String.fromCharCode(event.which);
    if (!char.match(/\d/)) event.preventDefault();

    //Se tiver atributo "limite", vai limitar a quantidade de dígitos permitidos
    let limite = parseInt(event.target.getAttribute("limit"));
    if (event.target.value.length >= limite
        //Se tiver texto selecionado, faz sentido permitir digitar, pois vai substituir, e a quantidade não excede o total permitido
        && event.target.selectionEnd - event.target.selectionStart == 0) event.preventDefault();
});

function getIntFromInput(selector) {
    return parseInt($(selector).val());
}

//Ainda assim é possível colar texto não numérico, ou arrastar texto para os campos. Essas funções tentam previnir isso
$(".floatBR, .intBR").on("paste", function (event) {
    event.preventDefault();
})
$(".floatBR, .intBR").on("dragover", function (event) {
    event.preventDefault();
})

function formataReal(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

//Formata número com a quantidade de dígitos após a vírgula que desejar
function formataFloat(valor, digitos, exibeZeros = false) {
    let valString = valor.toFixed(digitos).replace(".", ",");
    if (!exibeZeros) {
        //Se o valor for inteiro, não exibe os zeros
        valString = valString.replace(/,0*$/, "");
    }
    return valString;
}

//problema 1---------------
function calcularArea() {
    let comprimento = getFloatFromInput("#p1-comprimento");
    let largura = getFloatFromInput("#p1-largura");

    if (isNaN(comprimento) || isNaN(largura)) {
        $("#p1-resultado").html("Por favor, preencha todos os campos.");
        return;
    }

    let area = comprimento * largura;
    console.log(area);

    $("#p1-resultado").html(`A área do terreno é de ${formataFloat(area, 2)} metros quadrados.`);
}

//problema 2---------------
function calcularFerraduras() {
    let numeroCavalos = getIntFromInput("#p2-numeroCavalos");

    if (isNaN(numeroCavalos)) {
        $("#p2-resultado").html("Por favor, preencha todos os campos.");
        return;
    }

    let totalFerraduras = numeroCavalos * 4;

    $("#p2-resultado").html(`Número de ferraduras necessárias: ${totalFerraduras}`);
}

//problema 3---------------
function calcularVendas() {
    let quantidadePao = getIntFromInput("#p3-quantidadePao") || 0;
    let quantidadeBroa = getIntFromInput("#p3-quantidadeBroa") || 0;

    let precoPao = 0.12;
    let precoBroa = 1.50;

    let totalArrecadado = quantidadePao * precoPao + quantidadeBroa * precoBroa;
    let poupanca = totalArrecadado * 0.1;
    $("#p3-totalArrecadado").html(`Total arrecadado: ${formataReal(totalArrecadado)}`);
    $("#p3-poupanca").html(`Valor a guardar na poupança: ${formataReal(poupanca)}`);
}

//problema 4---------------
function calcularDias() {
    let nome = $("#p4-nome").val().trim();
    if (!nome) {
        $("#p4-resultado").html("Por favor, digite seu nome.");
        return;
    }

    let idade = getIntFromInput("#p4-idade");
    if (isNaN(idade)) {
        $("#p4-resultado").html("Por favor, digite sua idade.");
        return;
    } else if (!idade) {
        $("#p4-resultado").html("Por favor, digite idade maior que 0.");
        return;
    }

    $("#p4-resultado").html(`${nome}, você já viveu: ${idade * 365} dias!`);
}

//problema 5---------------
function calcGasolina() {
    let vlLt = getFloatFromInput("#p5-vlLt");
    let vlAbast = getFloatFromInput("#p5-vlAbast");

    if (vlLt <= 0 || vlAbast <= 0) {
        $("#p5-resultado").html("Valor deve ser maior que zero.");
        return;
    }

    if (!vlLt || !vlAbast) {
        $("#p5-resultado").html("Por favor, preencha todos os campos.");
        return;
    }

    $("#p5-resultado").html(`Litros abastecidos: ${formataFloat(vlAbast / vlLt, 3)}`);
}

//problema 6---------------
function calcularValor() {
    let peso = getFloatFromInput("#p6-peso");
    if (!peso) {
        $("#p6-resultado").html("Por favor, insira um peso válido.");
        return;
    }

    let valorPorQuilo = 12.00;
    let valorApagar = peso * valorPorQuilo;
    $("#p6-resultado").html(`Valor a pagar: ${formataReal(valorApagar)}.`);
}

//problema 7---------------
function calcDiasAno() {
    let dia = getIntFromInput("#p7-dia");

    if (isNaN(dia)) {
        $("#p7-resultado").html("Por favor, informe um dia.");
        return;
    }

    if (dia < 1 || dia > 30) {
        $("#p7-resultado").html("Dia deve ser entre 1 e 30.");
        return;
    }

    let mes = getIntFromInput("#p7-mes");

    $("#p7-resultado").html(`Se passaram ${30 * (mes - 1) + dia} dias desde o início do ano.`)
}

//problema 8---------------
function calcPreco() {
    let pequena = getIntFromInput("#p8-pequena") || 0;
    let media = getIntFromInput("#p8-media") || 0;
    let grande = getIntFromInput("#p8-grande") || 0;

    let resultado = pequena * 10 + media * 12 + grande * 15;

    $("#p8-resultado").html(`Valor arrecadado: ${formataReal(resultado)}.`);
}


//problema 9---------------
function calcDist() {
    let pA = {
        x: getFloatFromInput("#p9-pA-X"),
        y: getFloatFromInput("#p9-pA-Y")
    }
    let pB = {
        x: getFloatFromInput("#p9-pB-X"),
        y: getFloatFromInput("#p9-pB-Y")
    }

    if (isNaN(pA.x) || isNaN(pA.y) || isNaN(pB.x) || isNaN(pB.y)) {
        $("#p9-resultado").html("Por favor, preencha todos os campos.");
        return;
    }

    let dist = Math.sqrt((pA.x - pB.x) ** 2 + (pA.y - pB.y) ** 2);

    $("#p9-resultado").html(`Distância: ${formataFloat(dist, 4, true)}`);
}

//problema 10--------------
function converterTempo() {
    let quantidadedeDias = getIntFromInput("#p10-quantidadedeDias");

    if (isNaN(quantidadedeDias)) {
        $("#p10-tempoConvertido").html("Por favor, informe a quantidade de dias.");
        return;
    }

    let anos = Math.floor(quantidadedeDias / 360);
    let meses = Math.floor((quantidadedeDias % 360) / 30);
    let dias = quantidadedeDias % 30;

    $("#p10-tempoConvertido").html(`Tempo sem acidente: ${anos} anos, ${meses} meses e ${dias} dias.`);
}


//problema 11--------------
function calcSalario() {
    let salario = getFloatFromInput("#p11-vlInicial");

    if (isNaN(salario)) {
        $('[id^=p11-resultado]').html("&nbsp;");
        $("#p11-resultado1").html("Por favor, informe o salário inicial.");
        return;
    }

    $("#p11-resultado1").html(`Salário inicial: ${formataReal(salario)};`);
    $("#p11-resultado2").html(`Salário + 15%: ${formataReal(salario * 1.15)};`);
    $("#p11-resultado3").html(`(Salário + 15%) - impostos (8%): ${formataReal((salario * 1.15) * 0.92)}`);
}

//problema 12--------------
function calcDecimal() {
    let numero = getIntFromInput("#p12-numero");

    if (isNaN(numero)) {
        $("#p12-resultado").html("Por favor, informe um número.");
        return;
    }

    let strNumero = String(numero).padStart(3, "0");

    $("#p12-resultado").html(`CENTENA = ${strNumero[0]}; DEZENA = ${strNumero[1]}; UNIDADE = ${strNumero[2]}.`);
}

//problema 13--------------
function calcularAreaPizza() {
    let raio = getIntFromInput("#p13-raio");

    if (isNaN(raio)) {
        $("#p13-resultado").html("Por favor, informe um raio.");
        return;
    }

    let area = 3.14 * raio ** 2;
    $("#p13-resultado").html(`A área da pizza é: ${area} unidades quadradas.`)
}

//problema 14--------------
function calcularPagamento() {
    let valorTotal = getFloatFromInput("#p14-valorTotal");

    let valorCarlos = Math.floor(valorTotal / 3);
    let valorAndre = Math.floor(valorTotal / 3);
    let valorFelipe = valorTotal - (valorCarlos + valorAndre);

    $("#p14-resultado").html(`Carlos deve pagar: ${formataReal(valorCarlos)}; Andre deve pagar: ${formataReal(valorAndre)}; Felipe deve pagar: ${formataReal(valorFelipe)}`);
}

//Ao carregar a página, oculta todos os problemas
$(".problema").hide();