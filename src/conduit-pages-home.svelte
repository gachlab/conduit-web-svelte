<script>
  import ConduitPagesHomeService from "./conduit-pages-home-service.js";
  import ConduitTagsPopular from "./conduit-tags-popular.svelte";
  import ConduitArticlesFeeds from "./conduit-articles-feeds.svelte";
  import ConduitArticlesPreview from "./conduit-articles-preview.svelte";
  import ConduitArticlesMeta from "./conduit-articles-meta.svelte";
  import ConduitButtonsFavorite from "./conduit-buttons-favorite.svelte";

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

  let onFavoritedArticle = article => {
    console.log(article);
  };

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
        {#if state.feeds}
          <ConduitArticlesFeeds
            bind:feeds={state.feeds}
            bind:onSelect={onFeedSelected}
            bind:selected={state.selectedFeed} />
        {/if}
        {#if state.articles}
          {#each state.articles as article}
            <ConduitArticlesPreview bind:article>
              <ConduitArticlesMeta bind:article>
                <ConduitButtonsFavorite
                  bind:article
                  bind:onFavorite={onFavoritedArticle} />
              </ConduitArticlesMeta>
            </ConduitArticlesPreview>
          {/each}
        {/if}
      </div>
      <div class="col-md-3">
        {#if state.tags}
          <ConduitTagsPopular
            bind:tags={state.tags}
            bind:onSelect={onTagSelected} />
        {/if}
      </div>
    </div>
  </div>
</div>
