const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('bem vindo a lista de exercícios!!')
});

app.post('/desconto', (req, res) => {
    const { preco } = req.body;
    let desconto = 0;
    if (preco > 1000) {
        desconto = preco * 0.08;
    }
    let precoComDesconto = preco - desconto;
    res.json({ preco, desconto, precoComDesconto });
});

// INSS 
app.post('/inss', (req, res) => {
    const { salario } = req.body;
    let desconto = 0;

    if (salario <= 1212.00) {
        desconto = salario * 0.075;
    } else if (salario <= 2427.35) {
        desconto = salario * 0.09;
    } else if (salario <= 3641.03) {
        desconto = salario * 0.12;
    } else if (salario <= 7087.22) {
        desconto = salario * 0.14;
    } else {
        desconto = 7087.22 * 0.14;
    }

    const salarioFinal = salario - desconto;
    res.json({ salario, desconto, salarioFinal });
});

// Triangulos
app.post('/triangulo', (req, res) => {
    const { a, b, c } = req.body;
    let tipo = '';

    if (a === b && b === c) {
        tipo = 'EQUILÁTERO';
    } else if (a === b || b === c || a === c) {
        tipo = 'ISÓSCELES';
    } else {
        tipo = 'ESCALENO';
    }

    res.json({ a, b, c, tipo });
});

// Reajuste de mercadoria
app.post('/mercadoria', (req, res) => {
    const { nome, preco } = req.body;
    let aumento = preco < 1000 ? preco * 0.05 : preco * 0.07;
    let novoPreco = preco + aumento;

    res.json({ nome, preco, aumento, novoPreco });
});

// Maior numero
app.post('/maior-numero', (req, res) => {
    const { numeros } = req.body;
    const maiorNumero = Math.max(...numeros);

    res.json({ numeros, maiorNumero });
});

// ordenar numeros
app.post('/ordenar-numeros', (req, res) => {
    const { numeros } = req.body;
    const numerosOrdenados = numeros.sort((a, b) => a - b);

    res.json({ numeros, numerosOrdenados });
});

// maior e menor
app.post('/maior-menor', (req, res) => {
    const { num1, num2 } = req.body;
    const maior = Math.max(num1, num2);
    const menor = Math.min(num1, num2);

    res.json({ num1, num2, maior, menor });
});

// reajuste salarial
app.post('/reajuste-salarial', (req, res) => {
    const { salarioAtual } = req.body;
    let aumento = 0;

    if (salarioAtual >= 1500 && salarioAtual < 1750) {
        aumento = salarioAtual * 0.15;
    } else if (salarioAtual >= 1750 && salarioAtual < 2000) {
        aumento = salarioAtual * 0.12;
    } else if (salarioAtual >= 2000 && salarioAtual < 3000) {
        aumento = salarioAtual * 0.09;
    } else if (salarioAtual >= 3000) {
        aumento = salarioAtual * 0.06;
    }

    const novoSalario = salarioAtual + aumento;
    res.json({ salarioAtual, aumento, novoSalario });
});

// media
app.post('/media-notas', (req, res) => {
    const { notas } = req.body;
    const media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
    let situacao = '';

    if (media >= 6) {
        situacao = 'aprovado';
    } else if (media >= 4) {
        situacao = 'recuperação';
    } else {
        situacao = 'reprovado';
    }

    res.json({ notas, media, situacao });
});

// disconto
app.post('/desconto-loja', (req, res) => {
    const { peca, preco } = req.body;
    let desconto = 0;

    switch (peca.toLowerCase()) {
        case 'camisa':
            desconto = preco * 0.20;
            break;
        case 'bermuda':
            desconto = preco * 0.10;
            break;
        case 'calça':
            desconto = preco * 0.15;
            break;
        default:
            desconto = 0;
    }

    const precoFinal = preco - desconto;
    res.json({ peca, preco, desconto, precoFinal });
});

app.listen(4000, () => {
    console.log('Servidor rodando em http://localhost:4000');
});