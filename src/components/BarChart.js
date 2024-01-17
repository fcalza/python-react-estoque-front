import { useState, useEffect } from "react";
import Grafico from "./Grafico";
import axios from 'axios';

const BarChart = () => {

    const [graficoEntrada, setGraficoEntrada] = useState(null);
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/grafico/entradas")
        .then(response => {
            const userData = response.data;
            const labels = userData.map(item => item.mes_ano);
            const data = userData.map(item => item.total_quantidade);

            setGraficoEntrada({
                labels: labels,
                datasets: [
                    {
                    label: 'Saídas',
                    data: data,
                    backgroundColor: ["green", "blue"],
                    borderWidth: 1
                    }
                ]
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
    }, []); 


    const [graficoSaida, setGraficoSaida] = useState(null);
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/grafico/saidas")
        .then(response => {
            const userData = response.data;
            const labels = userData.map(item => item.mes_ano);
            const data = userData.map(item => item.total_quantidade);

            setGraficoSaida({
                labels: labels,
                datasets: [
                    {
                    label: 'Saídas',
                    data: data,
                    backgroundColor: ["green", "blue"],
                    borderWidth: 1
                    }
                ]
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
    }, []); 

    return (
        <div className="row">
        <div className="col-md-6">
            {graficoEntrada ? (<Grafico chartData={graficoEntrada} />) : (<p>Carregando dados...</p>)}
        </div>
        <div className="col-md-6">
            {graficoSaida ? (<Grafico chartData={graficoSaida} />) : (<p>Carregando dados...</p>)}
        </div>
        </div>
        
    )
};
 
export default BarChart;