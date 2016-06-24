namespace codex.debugbar {
}
namespace codex.debugbar.lib {

    app['content.types'] = new ContentTypeRepository;
    app['content.types'].register('text', app['content.types.text'] = new TextContentType);
    app['content.types'].register('code', app['content.types.code'] = new CodeContentType);
    app['content.types'].register('array', app['content.types.array'] = new ArrayContentType);
}
