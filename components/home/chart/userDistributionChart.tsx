import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { TooltipItem } from "chart.js"

type UserDistributionChartProps = {
  distributions: Array<{free: number, paid: number}>
}

const UserDistributionChart = ({distributions} : UserDistributionChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart<'pie', number[], string> | null>(null)

  const distributionName = distributions && distributions.map(name => Object.keys(name).map(word => word.charAt(0).toUpperCase() + word.slice(1)))
  const distributionValue = distributions && distributions.map(value => Object.values(value).map(value => Number(value)))

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        chartInstance.current = new Chart<'pie', number[], string>(ctx, {
          type: "pie",
          data: {
            labels: distributionName[0],
            datasets: [{
              data: distributionValue[0], 
              backgroundColor: [
                "#C8C2FC",
                "#7771F6"
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#EFF1E6",
                  padding: 20,
                  font: {
                    size: 14
                  }
                }
              },
              title: {
                display: true,
                text: "User Distribution",
                color: "#EFF1E6",
                font: {size: 20},
                padding: {top: 1, bottom: 30},
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label: function(tooltipItem: TooltipItem<"pie">) {
                    const data = tooltipItem.chart.data; 
                    const label = data.labels ? data.labels[tooltipItem.dataIndex] : "Unknown";
                    return `${label}: ${tooltipItem.formattedValue}%`;
                  },
                }
              }
            }
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [distributions, distributionName, distributionValue])

  return (
    <canvas ref={chartRef} className="w-full h-full"></canvas>
  )
}

export default UserDistributionChart