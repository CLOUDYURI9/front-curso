
async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const cursoDTO = {
        "nomeCurso": document.querySelectorAll("input")[0].value,
        "duracaoCurso": document.querySelectorAll("input")[1].value,
        "categorizacao": document.querySelectorAll("input")[2].value
    }

    console.log(cursoDTO)

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/curso", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursoDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }
    
        alert("Curso cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaCursos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/cursos");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeCursos = await respostaServidor.json();

        criarTabelaCursos(listaDeCursos)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaCursos(cursos) {
    const tabela = document.getElementById('corpoCurso');

    cursos.forEach(curso => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const id = document.createElement('td');
        id.textContent = curso.idCurso; // Preenche com o id do curso


        const nomeCurso = document.createElement('td');
        nomeCurso.textContent = curso.nomeCurso; // Preenche com o nome do curso


        const duracaoCurso = document.createElement('td');
        duracaoCurso.textContent = curso.duracaoCurso; // Preenche com a duracao do curso

        const categorizacao = document.createElement('td');
        categorizacao.textContent = curso.categorizacao; // Preenche com a categorização



        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img');
        iconAtualizar.src = 'assets/icons/pencil-square.svg';
        iconAtualizar.addEventListener('click', () => {
            // Criar objeto com os dados necessários
            const dadosParaEnviar = {
                nomeCurso: curso.nomeCurso,
                duracaoCurso: curso.duracaoCurso,
                categorizacao: curso.categorizacao,
                idCurso: curso.idCurso
            };
        
            // Converter para parâmetros de URL
            const queryParams = new URLSearchParams(dadosParaEnviar).toString();
        
            // Redirecionar com os dados na URL
            window.location.href = `atualizar-livro.html?${queryParams}`;
        });

        const iconExcluir = document.createElement('img');
        iconExcluir.addEventListener("click", () => excluirLivro(livro.idLivro)); 
        iconExcluir.src = 'assets/icons/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir'; 

        //chamando
        linha.appendChild(id);
        linha.appendChild(nomeCurso);
        linha.appendChild(duracaoCurso);
        linha.appendChild(categorizacao);
        tdAcoes.appendChild(iconAtualizar); 
        linha.appendChild(tdAcoes); 
        tdAcoes.appendChild(iconExcluir); 

       
        tabela.appendChild(linha);

    });

    async function excluirCurso(idCurso) {
        const url = `http://localhost:3333/remove/curso/${idCurso}`;
    
        try {
            const response = await fetch(url, { method: 'PUT' });
    
            if (response.ok) {
                alert('Curso removido com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir o curso.');
        }
    }
}