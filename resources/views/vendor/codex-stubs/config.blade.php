{!! $open !!}

return [
    'display_name' => '{{$displayName}}',

    'processors' => [
        'enabled' => ['attributes', 'markdown', 'replace_header', 'toc']
    ]
];
