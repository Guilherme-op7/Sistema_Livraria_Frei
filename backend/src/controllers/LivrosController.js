import { AtualizarLivro, CriarLivro, DeletarLivro, ListarLivros, ListarLivrosAutor, ListarLivrosGenero, ListarLivrosTitulo, ListarLivrosFiltro } from '../repository/LivrosRepository.js';
import { getAuthentication } from '../utils/jwt.js';

import { Router } from 'express';

const endpoints = Router();

const autenticador = getAuthentication();

endpoints.get('/livros', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await ListarLivros(dados);


        res.status(200).send({
            Lista: resposta
        });
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.get('/filtrar/livros', autenticador, async (req, res) => {
    try {
        const filtro = req.query.filtro;

        const resposta = await ListarLivrosFiltro(filtro);

        res.status(200).send({
            Lista: resposta
        });
    }

    catch (err) {
        res.status(500).send({
            erro: "Erro ao buscar livros."
        });
    }
});

endpoints.get('/filtrar/livros/titulo', autenticador, async (req, res) => {
    try {
        const filtro = req.query.filtro;

        const resposta = await ListarLivrosFiltro(filtro);

        res.status(200).send({
            Lista: resposta
        });
    } 
    
    catch (err) {
        res.status(500).send({
            erro: "Erro ao buscar livros."
        });
    }
});

endpoints.post('/livros', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await CriarLivro(dados);

        let id = resposta.insertId;

        res.status(200).send({
            mensagem: "Livro Criado com Sucesso!",
            id: id
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.put('/livros/:id', async (req, res) => {
    try {
        let dados = req.body;
        let id = req.params.id;

        let resposta = await AtualizarLivro(dados, id);

        let LinhasAfetadas = resposta.affectedRows;

        res.status(200).send({
            mensagem: "Livro Atualizado com sucesso!",
            LinhasAfetadas: LinhasAfetadas
        })
    }

    catch (err) {
        res.status(400).send({
            erro: err
        });
    }
})

endpoints.delete('/livros/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let resposta = await DeletarLivro(id);

        let LinhasAfetadas = resposta.affectedRows;

        res.status(200).send({
            mensagem: "Livro Deletado com Sucesso!",
            LinhasAfetadas: LinhasAfetadas
        })
    }

    catch (err) {
        res.status(400).send({
            erro: err
        });
    }
})

export default endpoints;