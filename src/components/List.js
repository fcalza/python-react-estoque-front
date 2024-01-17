import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'


const List = () => {

    const [produtoDados, setProdutoDados] = useState([]);
    useEffect(() => {
        fetchProduto();
    }, [])

    const fetchProduto = async () => {
        try {
            const result = await axios("http://127.0.0.1:5000/produtos");
            setProdutoDados(result.data)
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeletar=async(id)=>{
        const confirmDelete = window.confirm("Tem certeza que deseja deletar este produto?");
        if (confirmDelete) {
            await axios.delete("http://127.0.0.1:5000/produto/delete/"+id);
            const novoProdutoDados=produtoDados.filter((item)=>{
                return(
                    item.id !==id
                )
            })
            setProdutoDados(novoProdutoDados);
        }
    }      

    return(
        <div className="container">
        <h3 className='titulo_tela'>Produtos cadastrados</h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Nome</th>
                    <th>Número registro</th>
                    <th>Fabricante</th>
                    <th>tipo</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    produtoDados.map((produto, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{produto.nome} </td>
                                <td>{produto.numero_registro} </td>
                                <td>{produto.fabricante} </td>
                                <td>{produto.tipo} </td>
                                <td>{produto.descricao} </td>
                                <td>{produto.quantidade} </td>
                                <td>
                                    <NavLink to={`/edit/${produto.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                    <button onClick={()=>handleDeletar(produto.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
    );
};
 
export default List;