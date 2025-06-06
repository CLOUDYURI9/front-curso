
async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const alunoDTO = {
        "nomeAluno": document.querySelectorAll("input")[0].value,
        "dataNascimento": document.querySelectorAll("input")[1].value,
        "celular": Number(document.querySelectorAll("input")[2].value),
        "email": document.querySelectorAll("input")[3].value,

    }

    console.log(alunoDTO)
    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}


    async function recuperarListaAlunos() {

        try {
            const respostaServidor = await fetch("http://localhost:3333/lista/alunos");

            if (!respostaServidor.ok) {
                throw new Error('Erro ao comunicar com o servidor');
            }

            const listaDeAlunos = await respostaServidor.json();
            criarTabelaAlunos(listaDeAlunos)
            console.log(listaDeAlunos)
        } catch (error) {
            console.log('Erro ao comunicar com o servidor');
            console.log(error);
            return null;
        }
    }

async function criarTabelaAlunos(alunos) {
    const tabela = document.getElementById('corpoAluno');
    alunos.forEach(aluno => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const id = document.createElement('td');
        id.textContent = aluno.idAluno; // Preenche com o id do aluno

        const ra = document.createElement('td');
        ra.textContent = aluno.ra; // Preenche com a ra do aluno


        const nomeAluno = document.createElement('td');
        nomeAluno.textContent = aluno.nomeAluno; // Preenche com o nome do aluno

        const dataNascimento = document.createElement('td');
        dataNascimento.textContent = new Date(aluno.dataNascimento).toLocaleDateString('pt-br'); // Preenche com a data de nascimento do aluno



        const celular = document.createElement('td');
        celular.textContent = aluno.celular; // Preenche com o celular do aluno

        const email = document.createElement('td');
        email.textContent = aluno.email; // Preenche com o emmail do aluno


        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade
        
        iconAtualizar.addEventListener('click', () => {
            // Criar objeto com os dados necessários
            const dadosParaEnviar = {
                celular: aluno.celular,
                dataNascimento: aluno.dataNascimento,
                email: aluno.email,
                idAluno: aluno.idAluno,
                nomeAluno: aluno.nomeAluno,
                ra: aluno.ra,
            };
        
            // Converter para parâmetros de URL
            const queryParams = new URLSearchParams(dadosParaEnviar).toString();
        
            // Redirecionar com os dados na URL
            window.location.href = `atualizar-aluno.html?${queryParams}`;
        });


        const iconExcluir = document.createElement('img'); // Cria o elemento <img>
        iconExcluir.src = 'assets/icons/trash-fill.svg'; // Define o caminho da imagem
        iconExcluir.alt = 'Ícone de excluir'; // Texto alternativo para acessibilidade
        iconExcluir.addEventListener('click', () => excluirAluno(aluno.idAluno));

        //chamando
        linha.appendChild(id);
        linha.appendChild(ra);
        linha.appendChild(nomeAluno);
        linha.appendChild(dataNascimento)
        linha.appendChild(celular);
        linha.appendChild(email);
        tdAcoes.appendChild(iconAtualizar); 
        linha.appendChild(tdAcoes); 
        tdAcoes.appendChild(iconExcluir); 

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(linha);

    });

    async function excluirAluno(idAluno) {
        const alunoDTO = {
            statusAluno: false
        };
    
        try {
            const response = await fetch(`http://localhost:3333/remove/aluno?idAluno=${idAluno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alunoDTO)
            });
    
            if (response.ok) {
                alert('Aluno removido com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir o aluno.');
        }
    }
} 