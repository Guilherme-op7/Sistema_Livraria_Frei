import connection from "../database/connection.js";

export async function ListarEmprestimos() {
    let [resposta] =
        await connection.query(
            `SELECT emprestimos.id_livro, emprestimos.nome_aluno, emprestimos.turma, 
            emprestimos.data_emprestimo, emprestimos.data_prevista_devolucao, emprestimos.status,
            livros.titulo FROM emprestimos
            INNER JOIN livros ON emprestimos.id_livro = livros.id`
        )

    return resposta;
}

export async function ListarEmprestimosTitulo(titulo) {
    let [resposta] =
        await connection.query(
            `SELECT emprestimos.id, emprestimos.id_livro, emprestimos.nome_aluno, emprestimos.turma, 
            emprestimos.data_emprestimo, emprestimos.data_prevista_devolucao, emprestimos.status,
            livros.titulo FROM emprestimos
            INNER JOIN livros ON emprestimos.id_livro = livros.id
            WHERE livros.titulo LIKE ?`,
            [`%${titulo}%`]
        )

    return resposta;
}

export async function ListarEmprestimosAluno(nome_aluno) {
    let [resposta] =
        await connection.query(
            `SELECT emprestimos.id, emprestimos.id_livro, emprestimos.nome_aluno, emprestimos.turma, 
            emprestimos.data_emprestimo, emprestimos.data_prevista_devolucao, emprestimos.status,
            livros.titulo FROM emprestimos
            INNER JOIN livros ON emprestimos.id_livro = livros.id
            WHERE emprestimos.nome_aluno LIKE ?`,
            [`%${nome_aluno}%`]
        )

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