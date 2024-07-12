export interface IWord {
    id: number
    word: string
}

export interface IGraphic {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        borderColor: string[]
        backgroundColor: string[]
    }[]
}
