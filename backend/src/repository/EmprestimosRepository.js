import connection from "../database/connection.js";

export async function ListarEmprestimos(filtro = '') {
    const [resposta] = await connection.query(
        `SELECT e.id, e.id_livro, e.nome_aluno, e.turma,
                e.data_emprestimo, e.data_prevista_devolucao, e.status,
                l.titulo
         FROM emprestimos e
         INNER JOIN livros l ON e.id_livro = l.id
         WHERE e.nome_aluno LIKE ? OR l.titulo LIKE ?`,
        [`%${filtro}%`, `%${filtro}%`]
    );

    return resposta;
}



export async function InserirEmprestimo(NovosDados) {
    let [resposta] =
        await connection.query(
            `INSERT INTO emprestimos (id_livro, nome_aluno, turma, data_emprestimo, data_prevista_devolucao)
             VALUES (?, ?, ?, ?, ?)`,
            [NovosDados.id_livro, NovosDados.nome_aluno, NovosDados.turma, NovosDados.data_emprestimo, NovosDados.data_prevista_devolucao]
        )

    return resposta;
}

export async function AtualizarEmprestimo(id, status, data_prevista_devolucao) {
    let [resposta] =
        await connection.query(
            `UPDATE emprestimos 
             SET status = ?, data_prevista_devolucao = ?
             WHERE id = ?`,
            [status, data_prevista_devolucao, id]
        )

    return resposta;
}

export async function MarcarComoDevolvido(id_emprestimo) {
    let [emprestimo] =
        await connection.query(
            `SELECT id_livro FROM emprestimos WHERE id = ?`,
            [id_emprestimo]
        );

    let id_livro = emprestimo[0].id_livro;

    await connection.query(
        `UPDATE emprestimos 
         SET status = 'devolvido' 
         WHERE id = ?`,
        [id_emprestimo]
    );

    await connection.query(
        `UPDATE livros 
         SET status = 'disponível' 
         WHERE id = ?`,
        [id_livro]
    );

    return emprestimo;
}