import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

import useWords from '@/hooks/useWords'
import { IGraphic } from '@/types'
import { arrayStringToUpperCase } from '@/utils'

import cls from '@components/GraphicBar/index.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 1,
            borderRadius: 4,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top' as const,
        },
        title: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context: any) {
                    const yValue = context.raw

                    return '  ' + yValue
                },
            },
        },
    },
    scales: {
        x: {
            ticks: {
                stepSize: 1,
                precision: 0,
                color: '#e7e6e6',
                font: {
                    size: 14,
                },
            },
        },
        y: {
            ticks: {
                color: '#e7e6e6',
                fontSize: '1px',
                font: {
                    size: 14,
                },
            },
        },
    },
}

const GraphicBar: React.FC = () => {
    const [data, setData] = useState<IGraphic | undefined>(undefined)

    const { getStatistics } = useWords()

    useEffect(() => {
        const { firstLetters, countWordsSpelled } = getStatistics()
        const newData: IGraphic = {
            labels: arrayStringToUpperCase(firstLetters),
            datasets: [
                {
                    label: ' ',
                    data: countWordsSpelled,
                    borderColor: ['lime'],
                    backgroundColor: ['lime'],
                },
            ],
        }
        setData(newData)
    }, [])

    const minChartHeight = 200

    return (
        <div className={cls.bar}>
            {data && (
                <Bar
                    options={{
                        ...options,
                        aspectRatio: data.labels.length > 5 ? 2 : 1,
                    }}
                    data={data}
                    height={Math.max(data.labels.length * 30, minChartHeight)}
                />
            )}
        </div>
    )
}

export default GraphicBar
