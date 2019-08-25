import React, { Component } from 'react';

export class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>CurupiraCar</h1>

                <h2>Executando o backend</h2>
                <ul>
                    <li>Defina a string de conexão para o MySQL em <code>CurupiraCarAPI/appsettings</code></li>
                    <li>Passos para atualizar a base:
                        <ol>
                            <li>Abra o Package Manager</li>
                            <li>Selecione o projeto Repositories </li>
                            <li>Execute o seguinte comando: <code>Update-Database</code> </li>
                        </ol>
                    </li>
                    <li>Execute o projeto <code>CurupiraCarAPI</code></li>
                </ul>
                <hr />
                <h2>Executando o Front-end</h2>
                <ul>
                    <li>Abra o projeto CurupiraCarFront</li>
                    <li>Entre na pasta curupiracar</li>
                    <li>Execute o comando: <code>npm install</code> para instalar todas as dependencias</li>
                    <li>Apos a instalacao das dependencias, execute: <code>npm start</code></li>
                    <li><i>Have fun</i></li>
                </ul>
            </div>
        );
    }
}