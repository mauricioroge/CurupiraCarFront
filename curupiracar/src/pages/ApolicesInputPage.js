import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { cpfMask,ScrollTop } from '../util';
import API from '../Api';

export class ApolicesInputPage extends Component{
    state = {
        numeroApolice:Number(0),
        identificacaoSegurado: '',
        placaVeiculo: '',
        valorPremio: Number(0.0),
        validation: {},
        loading: false,
        submited:false,
        loadingSubmit: false,
        success: false
    };

    componentDidMount(){
        const {id}  = this.props.match.params;
        document.title = `CurupiraCar - ${id ? 'Editar' : 'Adicionar'} Apolice`;
        ScrollTop();

        id && this.RequestApolice(id);

    };
    
    HandleChange = ({ target }) => this.setState({ [target.name]: target.value, success: false });

    RequestApolice = id => {
        this.setState({ loading: true });
        API.get(`/api/ApoliceSeguro/${id}`).then(apolice => {
            this.setState({ ...apolice.data, loading: false });
        }).catch(ex => {
            console.log(ex)
            this.setState({ error: 'Falha ao requisitar esta apolice! :(', loading: false })
        })
    }

    SaveApolice = event => {
        event.preventDefault()

        this.setState({ loadingSubmit: true, submited: true })
        const { id } = this.props.match.params
        const { numeroApolice, identificacaoSegurado, placaVeiculo, valorPremio} = this.state

        if (id) {
            API.put(`/api/ApoliceSeguro/${id}`, { id,numeroApolice, identificacaoSegurado, placaVeiculo, valorPremio}).then(() => {
                this.setState({ success: true, validation: {}, loadingSubmit: false })
            }).catch(ex => {
                console.log(ex)
                if (ex) {
                    this.setState({ error: 'Não foi possível editar esta apolice! :(', loadingSubmit: false })
                } else {
                    this.setState({ validation: ex.error.validation, loadingSubmit: false })
                }
            })
        } else {
            API.post('/api/ApoliceSeguro', { numeroApolice, identificacaoSegurado, placaVeiculo, valorPremio}).then(() => {
                this.setState({ numeroApolice: '', identificacaoSegurado: '', placaVeiculo: '', valorPremio: 0, validation: {}, success: true, loadingSubmit: false })
            }).catch(ex => {
                console.log(ex)
                if (ex) {
                    this.setState({ error: 'Não foi possível adicionar esta apolice! :(', loadingSubmit: false })
                } else {
                    this.setState({ validation: ex.error.validation, loadingSubmit: false })
                }
            })
        }
    }
    render() {
        const { id } = this.props.match.params
        const { numeroApolice, identificacaoSegurado, placaVeiculo, valorPremio, loadingSubmit, success, validation, submited } = this.state
        return (
            <div>
                <h3>{id ? 'Editar' : 'Adicionar'} Apolice</h3>
                <Form onSubmit={this.SaveApolice} className="mt-10">
                    <Row>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label for="numeroApolice">Numero da apolice</Label>
                                <Input type="number" name="numeroApolice" id="numeroApolice" placeholder="123456" value={numeroApolice} onChange={this.HandleChange} invalid={!numeroApolice && submited} />
                                {/* <FormFeedback>{(validation.Name || []).join(', ')}</FormFeedback> */}
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label for="identificacaoSegurado">Identificacao do Segurado</Label>
                                <Input maxLength='14' minLength='11' type="text" name="identificacaoSegurado" id="identificacaoSegurado" placeholder="Insira o CPF ou CNPJ do segurado" value={identificacaoSegurado} onChange={this.HandleChange} invalid={!identificacaoSegurado && submited} />
                                <FormFeedback>{(validation.identificacaoSegurado || []).join(', ')}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label for="placaVeiculo">Placa do Veiculo</Label>
                                <Input type="text" name="placaVeiculo" id="placaVeiculo" placeholder="ABC-1A23" value={placaVeiculo} onChange={this.HandleChange} invalid={!placaVeiculo && submited} />
                                <FormFeedback>{(validation.placaVeiculo || []).join(', ')}</FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label for="valorPremio">valorPremio</Label>
                                <Input type="number" name="valorPremio" id="valorPremio" placeholder="15.25" value={valorPremio} onChange={this.HandleChange} invalid={!valorPremio && submited}/>
                                <FormFeedback>{(validation.valorPremio || []).join(', ')}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <Button color="link" title="Voltar" tag={Link} to="/apolices">Voltar</Button>
                        </Col>
                        <Col xs={6} className="text-right">
                            {success ? <span className="text-success mr-10">Apolice de seguro {id ? 'editada' : 'adicionada'} com sucesso!</span> : null}
                            <Button type="submit" color="success" title="Salvar" disabled={loadingSubmit}>
                                {success ? '√' : null}
                                {loadingSubmit ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }




}