document.getElementById('fanForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    let cpf = document.getElementById('cpf').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const interesses = document.getElementById('interesses').value.trim();
    const eventos = document.getElementById('eventos').value.trim();
    const compras = document.getElementById('compras').value.trim();
    const instagram = document.getElementById('instagram').value.trim();
    const twitter = document.getElementById('twitter').value.trim();
    const twitch = document.getElementById('twitch').value.trim();
    const documento = document.getElementById('documento').files[0];

    // Máscara de CPF
    cpf = aplicarMascaraCPF(cpf);

    // Validação de CPF
    if (!validarCPF(cpf)) {
        alert("CPF inválido. Por favor, insira um CPF válido.");
        return;
    }

    // Validação de Email
    if (!validarEmail(email)) {
        alert("Email inválido. Por favor, insira um e-mail válido.");
        return;
    }

    // Verificação de documento
    if (!documento) {
        alert("Por favor, envie um documento válido.");
        return;
    }

    let docValido = documento.name.endsWith(".pdf") || documento.type.includes("image/");
    let validacaoDocumento = docValido ? "✅ Documento validado com sucesso!" : "❌ Documento inválido.";

    // Prepara os dados para salvar
    const dados = {
        nome,
        email,
        cpf,
        endereco,
        interesses,
        eventos,
        compras,
        instagram,
        twitter,
        twitch,
        documento: documento.name
    };

    // Salva no localStorage
    localStorage.setItem('dadosFazendos', JSON.stringify(dados));

    // 🔥 Enviar também para o servidor via fetch
    fetch('http://localhost:3000/salvar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.text())
    .then(data => {
        console.log('✅ Dados enviados para o servidor:', data);
    })
    .catch(error => {
        console.error('❌ Erro ao enviar dados para o servidor:', error);
    });

    // Animação de carregamento e resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `<h2>⏳ Analisando seus dados, aguarde...</h2>`;

    setTimeout(() => {
        resultadoDiv.innerHTML = `
          <h2>🎯 Perfil do Fã - Análise</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>CPF:</strong> ${cpf}</p>
          <p><strong>Endereço:</strong> ${endereco}</p>
          <p><strong>Interesses:</strong> ${interesses}</p>
          <p><strong>Eventos:</strong> ${eventos}</p>
          <p><strong>Compras de e-sports:</strong> ${compras}</p>
          <p><strong>Instagram:</strong> ${validarPerfil(instagram)}</p>
          <p><strong>Twitter:</strong> ${validarPerfil(twitter)}</p>
          <p><strong>Twitch:</strong> ${validarPerfil(twitch)}</p>
          <p><strong>Documento enviado:</strong> ${documento.name}</p>
          <p><strong>Status do Documento:</strong> ${validacaoDocumento}</p>
        `;

        // Redireciona para a página de sucesso após 5 segundos
        setTimeout(() => {
            window.location.href = "sucesso.html";
        }, 5000);
    }, 2000); // 2 segundos de carregamento
});

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Função para validar Email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar perfil de redes sociais
function validarPerfil(link) {
    if (!link) return "Não informado.";
    return (link.includes("furia") || link.includes("esports")) ? "✅ Perfil relacionado a e-sports" : "⚠️ Perfil genérico.";
}

// Função para aplicar a máscara no CPF
function aplicarMascaraCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
