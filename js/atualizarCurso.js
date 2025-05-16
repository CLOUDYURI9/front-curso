const params = new URLSearchParams(window.location.search);

const dadosCurso = {
    nomeCurso: params.get('nomeCurso'),
    duracaoCurso: params.get('duracaoCurso'),
    categorizacao: params.get('categorizacao'),
    idCurso: params.get('idCurso'),
};

console.log(dadosCurso);

document.querySelectorAll("input")[0].value = dadosCurso.idCurso;
document.querySelectorAll("input")[1].value = dadosAluno.nomeCurso;
document.querySelectorAll("input")[2].value = dadosAluno.duracaoCurso;
document.querySelectorAll("input")[3].value = dadosAluno.categorizacao;


async function atualizaFormulario() {
    const cursoDTO = {
        "idCurso": Number(document.querySelectorAll("input")[0].value),
        "nomeCurso": document.querySelectorAll("input")[1].value,
        "duracaoCurso": document.querySelectorAll("input")[2].value,
        "categorizacao": document.querySelectorAll("input")[3].value

    }

    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualiza/curso?idCurso=${cursoDTO.idCurso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao atualizar os dados no servidor. Contate o administrador do sistema");
        }

        alert("Dados do curso atualizados com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

