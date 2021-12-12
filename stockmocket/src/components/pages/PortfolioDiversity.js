import React, { Component } from "react";
import { Doughnut, ArcElement } from 'react-chartjs-2';


class PortfolioDiversity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            graphdata: {
                labels: this.props.stock,
                datasets: [{
                  label: 'PORTFOLIO DIVERSITY',
                  data: this.props.chartData,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(120,28,129,0.2)',
                    'rgba(64,67,153,0.2)',
                    'rgba(72,139,194,0.2)',
                    'rgba(107,178,140,0.2)',
                    'rgba(159,190,87,0.2)',
                    'rgba(210,179,63,0.2)',
                    'rgba(231,126,49,0.2)',
                    'rgba(217,33,32,0.2)'
                    
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(120,28,129)',
                    'rgb(64,67,153)',
                    'rgb(72,139,194)',
                    'rgb(107,178,140)',
                    'rgb(159,190,87)',
                    'rgb(210,179,63)',
                    'rgb(231,126,49)',
                    'rgb(217,33,32)'
                  ],
                  borderWidth: 1,
                  hoverOffset: 20,
                  hoverBorderWidth: 2.5,
                }]
              }
        }
        console.log(props);
        
    }



    render() {

        return (
            <div className="container">
            <Doughnut data= {this.state.graphdata} />
            </div>
        )
    }

}

export default PortfolioDiversity;