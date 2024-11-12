import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { TooltipItem } from "chart.js"

type WeeklyTransactionChartProps = {
  transactions: Array<{monday: number, tuesday: number, wednesday: number, thursday: number, friday: number, saturday: number, sunday: number}>
}

const WeeklyTransactionChart = ({ transactions } : WeeklyTransactionChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const transactionName = transactions && transactions.map(transaction => Object.keys(transaction).map(key => key.charAt(0).toUpperCase() + key.slice(1)))
  const transactionValue = transactions && transactions.map(transaction => Object.values(transaction).map(value => Number(value)))

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: transactionName[0],
            datasets: [{
              label: "Weekly Transactions",
              data: transactionValue[0],
              backgroundColor: "#7771F6",
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "#2C384A"
                },
                ticks: {
                  color: "#758299"
                }
              },
              x: {
                grid: {
                  color: "#2C384A"  
                },
                ticks: {
                  color: "#F0F1E6"
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: "Weekly Transactions",
                color: "#F0F1E6",
                font: {size: 20},
                padding: {top: 1, bottom: 30},
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label: function(tooltipItem: TooltipItem<"bar">) {
                    const data = tooltipItem.chart.data; 
                    const label = data.labels ? data.labels[tooltipItem.dataIndex] : "Unknown";
                    return `${label}: ${tooltipItem.formattedValue}`;
                  },
                }
              }
            }
          }
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [transactions, transactionName, transactionValue])

  return (
    <canvas ref={chartRef} className="w-full h-full"></canvas>
  )
}

export default WeeklyTransactionChart 