({
    baseUrl: '../test',
    dir: '../dist',
    paths: {
        'tomato': 'empty:'
    },
    optimize: 'none',
    modules: [
        {
            name: 'extends/app',
            exclude: [
                'tomato'
            ]
        }
    ]
})