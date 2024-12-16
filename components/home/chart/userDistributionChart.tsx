import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { TooltipItem } from "chart.js"

type UserDistributionChartProps = {
  distributions: {
    user_basic_percentage: number,
    user_silver_percentage: number,
    user_gold_percentage: number,
  }
}

const UserDistributionChart = ({ distributions }: UserDistributionChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart<'pie', number[], string> | null>(null)

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
            labels: ["Basic", "Silver", "Gold"],
            datasets: [{
              data: [distributions?.user_basic_percentage, distributions?.user_silver_percentage, distributions?.user_gold_percentage],
              backgroundColor: [
                "#7373D3",
                "#B6B2FB",
                "#C8C2FC",
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
                font: { size: 20 },
                padding: { top: 1, bottom: 30 },
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label: function (tooltipItem: TooltipItem<"pie">) {
                    const data = tooltipItem.chart.data;
                    const label = data.labels ? data.labels[tooltipItem.dataIndex] : "Unknown";
                    const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
                    return `${label}: ${value}%`;
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
  }, [distributions])

  return (
    <canvas ref={chartRef} className="w-full h-full"></canvas>
  )
}

export default UserDistributionChart