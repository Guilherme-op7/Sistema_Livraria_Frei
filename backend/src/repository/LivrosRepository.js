import connection from '../database/connection.js';

export async function ListarLivros() {
    let [dados] = await connection.query('SELECT * FROM livros');

    return dados;
}

export async function ListarLivrosFiltro(filtro) {
    let [resultado] = await connection.query(`
        SELECT DISTINCT * FROM livros
        WHERE titulo LIKE ? 
        OR autor LIKE ? 
        OR genero LIKE ?`,
        [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`]);

    return resultado;
}

export async function ListarLivrosTitulo(titulo) {
    let [resultado] =
        await connection.query(
            `SELECT * FROM livros
            WHERE titulo like ?`, [`%${titulo}%`]
        )

    return resultado;
}

export async function ListarLivrosAutor(autor) {
    let [resultado] =
        await connection.query(
            `SELECT * FROM livros
            WHERE autor like ?`, [`%${autor}%`]
        )

    return resultado;
}

export async function ListarLivrosGenero(genero) {
    let [resultado] =
        await connection.query(
            `SELECT * FROM livros
            WHERE genero like ?`, [`%${genero}%`]
        )

    return resultado;
}

export async function CriarLivro(dados) {
    let [resposta] = await connection.query(
        `INSERT INTO livros (titulo, autor, genero, ano_publicacao, url_capa, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [dados.titulo, dados.autor, dados.genero, dados.ano_publicacao, dados.url_capa, dados.status]
    );

    return resposta;
}

export async function AtualizarLivro(dados, id) {
    let [resposta] = await connection.query(
        `UPDATE livros
         SET titulo = ?, 
         autor = ?, 
         genero = ?, 
         ano_publicacao = ?,
         url_capa = ?,
         status = ?
         WHERE id = ?`,
        [dados.titulo, dados.autor, dados.genero, dados.ano_publicacao, dados.url_capa, dados.status, id]
    );

    return resposta;
}

export async function DeletarLivro(id) {
    let [resposta] = await connection.query(
        `DELETE FROM livros WHERE id = ?`,
        [id]
    );

    return resposta;
}
