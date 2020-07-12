<script>
  import ConduitPagesHomeService from "./conduit-pages-home-service.js";
  import ConduitTagsPopular from "./conduit-tags-popular.svelte";
  import ConduitArticlesFeeds from "./conduit-articles-feeds.svelte";
  import ConduitArticlesPreview from "./conduit-articles-preview.svelte";
  import ConduitArticlesMeta from "./conduit-articles-meta.svelte";
  import ConduitButtonsFavorite from "./conduit-buttons-favorite.svelte";

  let tags = undefined;
  let articles = undefined;
  let feeds = undefined;
  let selectedFeed = undefined;
  let pages = undefined;
  let selectedPage = undefined;

  const onTagSelected = tag =>
    ConduitPagesHomeService.onTagSelected({ tag, state: getState() });

  const onFeedSelected = feed =>
    ConduitPagesHomeService.onFeedSelected({ feed, state: getState() });

  const onFavoritedArticle = article => {
    console.log(article);
  };

  const getState = () =>
    JSON.parse(
      JSON.stringify({
        articles: articles,
        pages: pages,
        tags: tags,
        feeds: feeds,
        selectedFeed: selectedFeed,
        selectedPage: selectedPage
      })
    );

  const setState = input => {
    articles = input.articles;
    pages = input.pages;
    tags = input.tags;
    feeds = input.feeds;
    selectedFeed = input.selectedFeed;
    selectedPage = input.selectedPage;
  };

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
          bind:feeds
          bind:onSelect={onFeedSelected}
          bind:selected={selectedFeed} />
        {#if articles}
          {#each articles as article}
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
        {#if tags}
          <ConduitTagsPopular bind:tags bind:onSelect={onTagSelected} />
        {/if}
      </div>
    </div>
  </div>
</div>
