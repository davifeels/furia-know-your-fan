const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Caminho absoluto do dados.json
const dataFilePath = path.join(__dirname, 'dados.json');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Função para garantir que o arquivo dados.json existe
function garantirArquivo() {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, '[]', 'utf8');
    }
}

// ROTA POST -> SALVAR DADOS
app.post('/salvar-dados', (req, res) => {
    const novoFan = req.body;

    garantirArquivo(); // Garantir que o arquivo existe

    let fans = [];
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        fans = JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler dados.json:', err);
    }

    fans.push(novoFan);

    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(fans, null, 2), 'utf8');
        res.send('✅ Dados salvos com sucesso no arquivo JSON!');
    } catch (err) {
        console.error('Erro ao salvar no dados.json:', err);
        res.status(500).send('❌ Erro ao salvar os dados.');
    }
});

// ROTA GET -> LISTAR FÃS
app.get('/listar-fans', (req, res) => {
    garantirArquivo();
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const fans = JSON.parse(data);

        let html = `
            <html>
                <head><title>Lista de Fãs</title></head>
                <body><h1>Fãs cadastrados</h1>
        `;

        fans.forEach((fan, index) => {
            html += `<p>#${index + 1} - ${fan.nome} (${fan.email})</p>`;
        });

        html += `</body></html>`;
        res.send(html);

    } catch (err) {
        console.error('Erro ao listar fãs:', err);
        res.status(500).send('Erro ao listar fãs.');
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
