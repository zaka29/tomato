//noinspection BadExpressionStatementJS
({
    baseUrl: '../',
    dir: '../dist',
    paths: {
        'tomato': 'empty:'
    },
    optimize: 'none',
    modules: [
        {
            name: 'src/main',
            exclude: [
                'tomato'
            ]
        }
    ]
})