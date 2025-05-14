// Recuperar os parâmetros da URL
const params = new URLSearchParams(window.location.search);

// Criar objeto com os dados
const dadosAluno = {
    celular: params.get('celular'),
    dataNascimento: params.get('dataNascimento'),
    email: params.get('email'),
    endereco: params.get('endereco'),
    idAluno: params.get('idAluno'),
    nomeAluno: params.get('nomeAluno'),
    ra: params.get('ra'),
};

console.log(dadosAluno);
// Agora você pode usar esses dados para preencher o formulário ou processar conforme necessário.


document.querySelectorAll("input")[0].value = dadosAluno.nomeAluno;
document.querySelectorAll("input")[1].value = dadosAluno.dataNascimento;
document.querySelectorAll("input")[2].value = dadosAluno.celular;
document.querySelectorAll("input")[3].value = dadosAluno.email;


async function atualizaFormulario() {
    // Recuperar as informações do formulário e colocar em objeto JSON
    const alunoDTO = {
        "id": dadosAluno.idAluno, // ID do aluno para atualização
        "nomeAluno": document.querySelectorAll("input")[0].value,
        "dataNascimento": document.querySelectorAll("input")[1].value,
        "celular": Number(document.querySelectorAll("input")[2].value),
        "email": document.querySelectorAll("input")[3].value

    }

    console.log(alunoDTO);
    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualiza/aluno/${alunoDTO.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao atualizar os dados no servidor. Contate o administrador do sistema");
        }

        alert("Dados do aluno atualizados com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

