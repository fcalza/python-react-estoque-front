import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();
    const clickToBackHandler = () => {
        navigate('/');
    }

    const [error, setError] = useState('');
    const [produtoCampos, setProdutoCampos] = useState({
        nome: "",
        numero_registro: "",
        fabricante: "",
        tipo: "",
        descricao: "",
    });

    const changeProdutoCamposHandler = (e) => {
        setProdutoCampos({
            ...produtoCampos,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();

        if (!produtoCampos.nome || !produtoCampos.numero_registro) {
            setError('Por favor, preencha, no mínimo, os campos de "Nome" e "Registro".');
            return;
        }
          
        try {
            await axios.put("http://127.0.0.1:5000/produto/add", produtoCampos);
            setProdutoCampos({
                nome: "",
                numero_registro: "",
                fabricante: "",
                tipo: "",
                descricao: "",
            })
            setError('');
        } catch (err) {
            console.log(err);
            if (err.response.status === 400) {
                setError(err.response.data.error);
                return;
            }
            setError('Erro ao carregar entradas. Tente novamente mais tarde.');
        }
    }

    return (
        <div className="container">
            <h3 className='titulo_tela'>Cadastrar produto</h3>
            <form>
                <div className='row'>
                    <div className="col-md-6 mt-3">
                        <label className="form-label"> Nome do produto:</label>
                        <input type="text" className="form-control" placeholder="Informe o nome do produto" name="nome"
                            value={produtoCampos.nome} onChange={e => changeProdutoCamposHandler(e)} />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Número registro</label>
                        <input type="text" className="form-control" id="numero_registro" 
                        placeholder="Número registro" name="numero_registro"
                        value={produtoCampos.numero_registro} onChange={e => changeProdutoCamposHandler(e)} />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Tipo</label>
                        <input type="text" className="form-control" id="tipo" placeholder="Tipo" name="tipo"
                            value={produtoCampos.tipo} onChange={e => changeProdutoCamposHandler(e)} />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Fabricante</label>
                        <input type="text" className="form-control" id="fabricante" placeholder="Fabricante" name="fabricante"
                            value={produtoCampos.fabricante} onChange={e => changeProdutoCamposHandler(e)} />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Descrição</label>
                        <input type="text" className="form-control" id="descricao" placeholder="Descrição" name="descricao"
                            value={produtoCampos.descricao} onChange={e => changeProdutoCamposHandler(e)} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='button-group mt-3'>
                        <button type="submit" className="btn btn-success" onClick={e => onSubmitChange(e)}>Cadastrar</button>
                        <a className='btn btn-primary mx-2' href='/'>Voltar</a>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Add;