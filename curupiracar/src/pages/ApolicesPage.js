import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, InputGroup, InputGroupAddon, Button, ButtonGroup, Form } from 'reactstrap';
import { Table, Alert } from 'reactstrap';
import { ScrollTop } from '../util';
import API from '../Api';


export class ApolicesPage extends Component {
    state = {
        apolices: [],
        search: '',
        error: '',
        loading: false,
        loadingDelete: 0
    }

    componentDidMount() {
        document.title = 'CurupiraCar - Apólices';
        ScrollTop();
        this.RequestApolices();
    }
    HandleChange = ({ target }) => this.setState({ [target.name]: target.value });

    HandleOrder = value => () => this.setState(state => {
        let orderBy = value;
        let orderWay = state.orderWay === 'ASC' ? 'DESC' : 'ASC';
        return { orderWay, orderBy }
    }, this.RequestApolices)

    RequestApolices = event => {
        event && event.preventDefault();

        this.setState({ loading: true });
        const { search } = this.state;
        if (search === "")
            API.get('/api/ApoliceSeguro').then(res => {
                this.setState({ apolices: res.data, loading: false });
            }).catch(_ => {
                this.setState({ error: 'Falha na requisição das apólices! =(', loading: false })
            });
        else if (search)
            API.get(`/api/ApoliceSeguro?search=${this.state.search}`).then(res => {
                this.setState({ apolices: res.data, loading: false });
            }).catch(_ => {
                this.setState({ error: 'Falha na requisição das apólices! =(', loading: false })
            });
    }
    DeleteApolice = id => {
        this.setState({ loadingDelete: id });
        API.delete(`/api/ApoliceSeguro/${id}`).then(() => {
            this.setState(state => ({
                apolices: state.apolices.filter(apolices => apolices.id !== id),
                loadingDelete: 0
            }));
        }).catch(_ => {
            this.setState({ error: 'Falha ao remover esta apolice! =(', loadingDelete: 0 })
        });
    }

    render() {
        const { apolices, loading, search, loadingDelete, error } = this.state
        return (
            <div>
                <h1>Apólices de seguro automotivas</h1>
                <Button tag={Link} to="/apolices/adicionar" color="success" className="mb-10" title="Nova Apolice">
                    Nova Apolice
                </Button>
                <Form onSubmit={this.RequestApolices} className="mb-10">
                    <InputGroup>
                        <Input type="search" name="search" placeholder="Procure por Numero da Apolice, CPF, CNPJ, Placa ou Valor do Premio" value={search} onChange={this.HandleChange} />
                        <InputGroupAddon addonType="append">
                            <Button color="info" type="submit" title="Procurar">Procurar</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>

                {error ? <Alert color="danger">{error}</Alert> : null}
                {loading ? <span>Carregando...</span> : (

                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th value="Número da apólice">Número da apólice</th>
                                <th value="CPF/CNPJ do segurado">CPF/CNPJ do segurado</th>
                                <th value="Placa do veículo">Placa do veículo</th>
                                <th value="Valor do prêmio">Valor do prêmio</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apolices.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Não há apólices cadastradas! Porque não adiciona algumas?</td>

                                </tr>
                            ) : null}
                            {apolices.map(apolice =>
                                <tr key={apolice.id}>
                                    <td>{apolice.numeroApolice}</td>
                                    <td>{apolice.identificacaoSegurado}</td>
                                    <td>{apolice.placaVeiculo}</td>
                                    <td>{apolice.valorPremio}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button color="Primary" size="sm" title="Editar" tag={Link} to={`/apolices/${apolice.id}`}>
                                                Editar
                                            </Button>
                                            <Button onClick={() => this.DeleteApolice(apolice.id)} color="danger" size="sm" title={loadingDelete === apolice.id ? 'Removendo...' : 'Remover'}>
                                                {loadingDelete === apolice.id ? '.....' : 'Remover'}
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                )}
            </div>
        );
    }

}