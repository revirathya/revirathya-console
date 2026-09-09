const currencyFormatter: Intl.NumberFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})

export function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
}

const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
})


export function formatDate(value: string): string {
    const date: Date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
        ? value
        : dateFormatter.format(date);
}