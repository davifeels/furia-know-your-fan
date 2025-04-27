const fs = require('fs');
const axios = require('axios');

// Lê o arquivo dados.json
const dados = JSON.parse(fs.readFileSync('dados.json', 'utf-8'));

// Função para enviar cada fã
async function enviarDados(fan) {
    try {
        const response = await axios.post('http://localhost:3000/salvar-dados', {
            nome: fan.nome,
            email: fan.email,
            cpf: fan.cpf,
            endereco: fan.endereco || "Não informado",
            interesses: fan.interesses,
            eventos: fan.eventos || "Não informado",
            compras: fan.compras || "Não informado",
            instagram: fan.instagram || "Não informado",
            twitter: fan.twitter || "Não informado",
            twitch: fan.twitch || "Não informado",
            documento: fan.documento || "Não informado"
        });
        console.log(`✅ Sucesso ao enviar: ${fan.nome}`);
    } catch (error) {
        console.error(`❌ Erro ao enviar: ${fan.nome}`, error.message);
    }
}

// Envia todos os fãs
async function iniciarEnvio() {
    for (const fan of dados) {
        await enviarDados(fan);
    }
    console.log('🏁 Envio concluído!');
}

iniciarEnvio();
