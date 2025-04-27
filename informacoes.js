document.addEventListener('DOMContentLoaded', function () {
    const apiProximosJogosUrlFuria = 'https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=139269'; // FURIA

    async function carregarDados() {
        try {
            console.log('Carregando dados dos próximos jogos da FURIA...');
            const jogosResponseFuria = await fetch(apiProximosJogosUrlFuria);
            if (!jogosResponseFuria.ok) throw new Error('Erro ao buscar jogos da FURIA');
            const jogosDataFuria = await jogosResponseFuria.json();
            console.log('Jogos da FURIA carregados:', jogosDataFuria);

            const jogosContainerFuria = document.getElementById('jogos-lista');
            jogosContainerFuria.innerHTML = '';
            if (jogosDataFuria.events) {
                jogosDataFuria.events.forEach(jogo => {
                    const div = document.createElement('div');
                    const dataFormatada = new Date(jogo.dateEvent).toLocaleDateString();
                    const horaFormatada = jogo.strTime ? jogo.strTime.slice(0,5) : "Hora não informada";

                    div.innerHTML = `
                        <h3>${jogo.strEvent}</h3>
                        <p><strong>Data:</strong> ${dataFormatada} | <strong>Hora:</strong> ${horaFormatada}</p>
                    `;
                    jogosContainerFuria.appendChild(div);
                });
            } else {
                jogosContainerFuria.innerHTML = '<p>Nenhum jogo encontrado.</p>';
            }

        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
            alert('Houve um erro ao carregar as informações. Por favor, tente novamente mais tarde.');
        }
    }

    carregarDados();
});
