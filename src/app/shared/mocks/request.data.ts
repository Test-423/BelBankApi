export const REQUEST = {
    urlBody: "https://www.nbrb.by/api/exrates/rates/dynamics/",
    startDate: '2021-6-17',
    endDate: '2021-6-23',
    currencies: [
        {
            curName: 'RUR',
            curCode: 298
        },
        {
            curName: 'EUR',
            curCode: 292
        },
        {
            curName: 'USD',
            curCode: 145
        }
    ]
}