import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import BarChart from './BarChart';

const GerenciarDados = () => {
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [error, setError] = useState('');

  const handleDownloadEntradas = async () => {
    try {
      if (!dataInicio || !dataFim) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:5000/produto/gerencia?tipo=entrada&dataInicio=${dataInicio.toISOString()}&dataFim=${dataFim.toISOString()}`,
        { responseType: 'blob' }
      );
      baixar(response);
      limpar();
    } catch (err) {
      if (err.response && err.response.status === 400) {
          const responseData = await err.response.data.text();
          const parsedData = JSON.parse(responseData);
          setError(parsedData.error);
          return;
      }
      setError('Erro ao processar registros. Tente novamente mais tarde.');
    }
  };

  const handleDownloadSaidas = async () => {
    try {
      if (!dataInicio || !dataFim) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:5000/produto/gerencia?tipo=saida&dataInicio=${dataInicio.toISOString()}&dataFim=${dataFim.toISOString()}`,
        { responseType: 'blob' }
      );
      baixar(response);
      limpar();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const responseData = await err.response.data.text();
        const parsedData = JSON.parse(responseData);
        setError(parsedData.error);
        return;
    }
      setError('Erro ao processar registros. Tente novamente mais tarde.');
    }
  };

  const handleDownloadCompleto = async () => {
    try {
      if (!dataInicio || !dataFim) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:5000/produto/gerencia?tipo=completo&dataInicio=${dataInicio.toISOString()}&dataFim=${dataFim.toISOString()}`,
        { responseType: 'blob' }
      );
      baixar(response);
      limpar();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const responseData = await err.response.data.text();
        const parsedData = JSON.parse(responseData);
        setError(parsedData.error);
        return;
    }
      setError('Erro ao processar registros. Tente novamente mais tarde.');
    }
  };

  async function baixar(response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'logs.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  async function limpar() {
    setDataInicio(null);
    setDataFim(null);
    setError('');
  };

  return (
    <div className='container'>
      
      <h3 className='titulo_tela'>Gerenciar Dados</h3>
      <div className='row'>
        <div className='col-md-12'>
          <label>Data Início: &nbsp;</label>
          <DatePicker
            selected={dataInicio}
            onChange={(date) => setDataInicio(date)}
            dateFormat="dd/MM/yyyy"
            utcOffset={180}
            className="form-control"
          />
        </div>
        <div className='col-md-12 mt-2'>
          <label>Data Fim:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <DatePicker
            selected={dataFim}
            onChange={(date) => setDataFim(date)}
            timeIntervals={15}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
        </div>
        

      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="btn btn-info mt-2 margin_direita" onClick={handleDownloadEntradas}>Baixar Entradas</button>
      <button className="btn btn-info mt-2 margin_direita" onClick={handleDownloadSaidas}>Baixar Saídas</button>
      <button className="btn btn-primary mt-2" onClick={handleDownloadCompleto}>Baixar Completo</button>

      <div className='col-md-12 mt-5'>
          <BarChart />
        </div>
    </div>
  );
};

export default GerenciarDados;
