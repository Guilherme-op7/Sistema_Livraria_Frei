create database livraria;
use livraria;

create table administradores (
    id int auto_increment primary key,
    nome varchar(100),
    email varchar(100) unique not null,
    senha varchar(255), 
    criado_em timestamp default current_timestamp
);

create table livros (
    id int auto_increment primary key,
    titulo varchar(255),
    autor varchar(255),
    genero varchar(100),
    ano_publicacao date,
    url_capa varchar(1200),
    status enum('disponível', 'emprestado', 'indisponível') default 'disponível'
);

create table emprestimos (
    id int auto_increment primary key,
    id_livro int,
    nome_aluno varchar(100),
    turma varchar(50),
    data_emprestimo date,
    data_prevista_devolucao date,
    status enum('em andamento', 'devolvido') default 'em andamento',
    foreign key (id_livro) references livros(id) on delete cascade
);
