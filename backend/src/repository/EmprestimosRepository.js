import connection from "../database/connection.js";

export async function ListarEmprestimos(filtro = '') {
    let [resposta] = await connection.query(
        `SELECT emprestimos.id, emprestimos.id_livro, emprestimos.nome_aluno, emprestimos.turma,
                emprestimos.data_emprestimo, emprestimos.data_prevista_devolucao, emprestimos.status,
                livros.titulo
         FROM emprestimos
         INNER JOIN livros ON emprestimos.id_livro = livros.id
         WHERE emprestimos.nome_aluno LIKE ? OR livros.titulo LIKE ?`,
        [`%${filtro}%`, `%${filtro}%`]
    );

    return resposta;
}


export async function InserirEmprestimo(NovosDados) {

    let [livro] = await connection.query(
        `SELECT status FROM livros WHERE id = ?`,
        [NovosDados.id_livro]
    );

    if (!livro.length)
        throw new Error("Livro não encontrado.");

    if (livro[0].status === "emprestado")
        throw new Error("Este livro já está emprestado.");

    let [resposta] = await connection.query(
        `INSERT INTO emprestimos (id_livro, nome_aluno, turma, data_emprestimo, data_prevista_devolucao)
     VALUES (?, ?, ?, ?, ?)`,
        [
            NovosDados.id_livro,
            NovosDados.nome_aluno,
            NovosDados.turma,
            NovosDados.data_emprestimo,
            NovosDados.data_prevista_devolucao
        ]
    );

    await connection.query(
        `UPDATE livros SET status = 'emprestado' WHERE id = ?`,
        [NovosDados.id_livro]
    );

    return resposta;
}

export async function AtualizarEmprestimo(id, status, data_prevista_devolucao) {
    let [resposta] = await connection.query(
        `UPDATE emprestimos 
     SET status = ?, data_prevista_devolucao = ?
     WHERE id = ?`,
        [status, data_prevista_devolucao, id]
    );

    return resposta;
}

export async function MarcarComoDevolvido(id_emprestimo) {
    let [emprestimo] = await connection.query(
        `SELECT id_livro FROM emprestimos WHERE id = ?`,
        [id_emprestimo]
    );

    if (!emprestimo || emprestimo.length === 0)
        throw new Error("Empréstimo não encontrado.");

    let id_livro = emprestimo[0].id_livro;

    await connection.query(
        `UPDATE emprestimos SET status = 'devolvido' WHERE id = ?`,
        [id_emprestimo]
    );

    await connection.query(
        `UPDATE livros SET status = 'disponível' WHERE id = ?`,
        [id_livro]
    );

    return { id_emprestimo, id_livro };
}

export async function DeletarTodosEmprestimos() {
    await connection.query(
        `UPDATE livros 
         SET status = 'disponível' 
         WHERE id IN (SELECT id_livro FROM emprestimos)`
    );

    let [resposta] = await connection.query(
        `DELETE FROM emprestimos`
    );

    return resposta;
}
