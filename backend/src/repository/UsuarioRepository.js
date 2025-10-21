import connection from '../database/connection.js'

export async function CriarCredenciais(NovoLogin) {
    let [resultados] = 
      await connection.query(
        `INSERT INTO administradores (nome, email, senha)
        VALUES (?, ?, MD5(?))`, [NovoLogin.nome, NovoLogin.email, NovoLogin.senha]
      )

    return resultados
}

export async function validarCredenciais(email, senha) {
    let [resultados] = 
      await connection.query(
        `SELECT * from administradores
        WHERE email = ? and senha = MD5(?)`, [email, senha]
      )

    return resultados[0]
}