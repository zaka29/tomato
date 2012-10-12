({
    baseUrl: '../test',
    dir: '../dist',
    paths: {
        'tomato': 'empty:'
    },
    optimize: 'none',
    modules: [
        {
            name: 'extends/main',
            exclude: [
                'tomato'
            ]
        }
    ]
})