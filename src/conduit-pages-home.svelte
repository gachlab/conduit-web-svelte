<script>
  import ConduitPagesHomeService from "./conduit-pages-home-service.js";
  import ConduitTagsList from "./components/conduit-tags-list.svelte";
  import ConduitArticlesFeeds from "./components/conduit-articles-feeds.svelte";
  import ConduitArticlesList from "./components/conduit-articles-list.svelte";
  import ConduitLayoutPagination from "./components/conduit-layout-pagination.svelte";

  let state = undefined;

  let onTagSelected = tag =>
    ConduitPagesHomeService.onTagSelected({
      tag,
      state: Object.assign({}, state)
    }).then(setState);

  let onFeedSelected = feed =>
    ConduitPagesHomeService.onFeedSelected({
      feed,
      state: Object.assign({}, state)
    }).then(setState);

  let onPageSelected = page =>
    ConduitPagesHomeService.onPageSelected({
      page,
      state: Object.assign({}, state)
    }).then(setState);

  const setState = input => (state = Object.assign({}, input));

  ConduitPagesHomeService.init()
    .then(setState)
    .then(() => ConduitPagesHomeService.start(Object.assign({}, state)))
    .then(setState);
</script>

{#if state}
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">{state.banner.title}</h1>
        <p>{state.banner.subtitle}</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <ConduitArticlesFeeds
            bind:feeds={state.feeds.data}
            bind:onSelect={onFeedSelected} />
          <ConduitArticlesList bind:articles={state.articles.data}>
            <ConduitLayoutPagination
              bind:pages={state.articles.pages}
              bind:onSelect={onPageSelected} />
          </ConduitArticlesList>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <ConduitTagsList
              bind:tags={state.tags.data}
              bind:isOutlined={state.tags.isOutlined}
              bind:onSelect={onTagSelected} />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
