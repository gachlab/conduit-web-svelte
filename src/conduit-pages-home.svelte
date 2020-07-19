<script>
  import ConduitPagesHomeService from "./conduit-pages-home-service.js";
  import ConduitTagsList from "./conduit-tags-list.svelte";
  import ConduitArticlesFeeds from "./conduit-articles-feeds.svelte";
  import ConduitArticlesList from "./conduit-articles-list.svelte";

  let state = undefined;

  let onTagSelected = tag =>
    ConduitPagesHomeService.onTagSelected({
      tag,
      state: Object.assign({}, state)
    });

  let onFeedSelected = feed =>
    ConduitPagesHomeService.onFeedSelected({
      feed,
      state: Object.assign({}, state)
    });

  const setState = input => (state = Object.assign({}, input));

  ConduitPagesHomeService.init().then(state => setState(state));
</script>

<div class="home-page">
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <ConduitArticlesFeeds
          bind:feeds={state.feeds}
          bind:onSelect={onFeedSelected}
          bind:selected={state.selectedFeed} />
        <ConduitArticlesList bind:articles={state.articles} />
      </div>
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <ConduitTagsList
            bind:tags={state.tags}
            bind:onSelect={onTagSelected} />
        </div>
      </div>
    </div>
  </div>
</div>
