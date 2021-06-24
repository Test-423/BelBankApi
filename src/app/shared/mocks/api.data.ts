export const API = {
    url: "https://www.nbrb.by/api/exrates/rates/dynamics/",
    startDate: '2021-6-17',
    endDate: '2021-6-23',
    params: [
        {
            name: 'EUR',
            code: 292
        },
        {
            name: 'USD',
            code: 145
        },
        {
            name: 'RUB',
            code: 298
        }
    ]
}