import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SaidaProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [error, setError] = useState('');
  const [logs, setLogs] = useState([]);
  const [local, setLocal] = useState('');
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    fetchProdutos();
    fetchLog();
  }, []);

  const fetchProdutos = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/produtos");
      setProdutos(result.data);
    } catch (err) {
      console.log(err);
      setError('Erro ao carregar produtos. Tente novamente mais tarde.');
    }
  }

  const fetchLog = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/log_produto/saidas");
      setLogs(result.data);
    } catch (err) {
      console.log(err);
      setError('Erro ao carregar registros. Tente novamente mais tarde.');
    }
  }

  const handleSaida = async (e) => {
    e.preventDefault();
    try {
      if (!selectedProduto || !quantidade) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
      const quantidadeInt = parseInt(quantidade, 10);
      if (isNaN(quantidadeInt) || quantidadeInt <= 0) {
        setError('A quantidade deve ser um número inteiro positivo.');
        return;
      }
      await axios.post(
        `http://127.0.0.1:5000/produto/saida/${selectedProduto}`,
        { quantidade, local, dataHora}
      );
      setSelectedProduto('');
      setQuantidade('');
      setDataHora(new Date());
      setLocal('');
      setError('');
      fetchLog();
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setError(err.response.data.error);
        return;
      }
      setError('Erro ao processar a saída do produto. Tente novamente mais tarde.');
    }

  }

  return (
    <div className="container saida-produto">
      <h3 className='titulo_tela'>Saída de Produto</h3>
      <form onSubmit={handleSaida}>
        <div className='row'>
          <div className="col-md-6 mt-3">
            <label className="form-label">Selecione o Produto:</label>
            <select className="form-control" value={selectedProduto}
              onChange={(e) => setSelectedProduto(e.target.value)}>
              <option value="" disabled>Escolha um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>{produto.nome}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mt-3">
            <label className="form-label">Quantidade:</label>
            <input type="number" className="form-control" value={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
          </div>
          <div className="col-md-6 mt-3">
            <label className="form-label">Local:</label>
            <input type="text" className="form-control" value={local} onChange={(e) => setLocal(e.target.value)}/>
          </div>
          <div className="col-md-6 mt-5">
            <label className="form-label">Data e Hora: &nbsp;</label>
            <DatePicker
              selected={dataHora}
              onChange={(date) => setDataHora(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Hora"
              dateFormat="dd/MM/yyyy HH:mm"
              className="form-control"
            />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn btn-success mt-3">Registrar Saída</button>
      </form>
      <div className="mt-5">
        <h4>Registros de Saídas</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Local</th>
              <th>Data de Saída</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.nome_produto}</td>
                <td>{log.quantidade}</td>
                <td>{log.local}</td>
                <td>{moment(log.data_hora).format('HH:mm:ss DD/MM/YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* @TODO paginação  npm install react-paginate */}
      </div>
    </div>
  );
}

export default SaidaProduto;
