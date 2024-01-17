import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
 
const Edit = () => {
    const {id}=useParams()
    const navigate = useNavigate();
 
    const [produtoCampos, setProdutoCampos] = useState({
        nome: "",
        numero_registro: "",
        fabricante: "",
        tipo: "",
        descricao: "",
    });
 
    useEffect(()=>{
        fetchProduto();
    },[id])
 
    const fetchProduto=async()=>{
        try{
            const result=await axios.get("http://127.0.0.1:5000/produto/"+id);
            setProdutoCampos(result.data)
        }catch(err){
            console.log(err);
        }
    }
 
    const changeProdutoCamposHandler = (e) => {
        setProdutoCampos({
            ...produtoCampos,
            [e.target.name]: e.target.value
        });
    }
     
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://127.0.0.1:5000/produto/atualizar/"+id, produtoCampos);
            navigate('/');  
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="container">
            <h3 className='titulo_tela'>Editar produto</h3>
            <form>
                <div className='row'>
                    <div className="col-md-6 mt-3">
                        <label className="form-label"> ID:</label>
                        <input type="text" className="form-control" id="id" name="id" value={id} disabled />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label"> Nome do produto:</label>
                        <input type="text" className="form-control" placeholder="Informe o nome do produto" name="nome" 
                        value={produtoCampos.nome} onChange={e => changeProdutoCamposHandler(e)} />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Número registro</label>
                        <input type="text" className="form-control" id="numero_registro" placeholder="Número registro" name="numero_registro" 
                        value={produtoCampos.numero_registro} onChange={e => changeProdutoCamposHandler(e)}/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Tipo</label>
                        <input type="text" className="form-control" id="tipo" placeholder="Tipo" name="tipo" 
                        value={produtoCampos.tipo} onChange={e => changeProdutoCamposHandler(e)}/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Descrição</label>
                        <input type="text" className="form-control" id="descricao" placeholder="Descrição" name="descricao" 
                        value={produtoCampos.descricao} onChange={e => changeProdutoCamposHandler(e)}/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Fabricante</label>
                        <input type="text" className="form-control" id="fabricante" placeholder="Fabricante" name="fabricante" 
                        value={produtoCampos.fabricante}  onChange={e => changeProdutoCamposHandler(e)}/>
                    </div>
                    <div className='button-group my-2'>
                        <button type="submit" className="btn btn-success" onClick={e=>onSubmitChange(e)}>Atualizar</button>
                        <a className='btn btn-primary mx-2' href='/'>Voltar</a>
                    </div>
                </div>
            </form>
        </div>
    );
};
 
export default Edit;