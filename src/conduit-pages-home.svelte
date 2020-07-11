<script>
  import ConduitPagesHomeService from "./conduit-pages-home-service.js";
  import ConduitTagsPopular from "./conduit-tags-popular.svelte";
  import ConduitArticlesFeeds from "./conduit-articles-feeds.svelte";
  import ConduitArticlesPreview from "./conduit-articles-preview.svelte";
  import ConduitArticlesMeta from "./conduit-articles-meta.svelte";
  import ConduitButtonsFavorite from "./conduit-buttons-favorite.svelte";

  let tags = undefined;
  let articles = undefined;

  let feeds = [
    { id: "personal", name: "Your feed" },
    { id: "all", name: "Global Feed" }
  ];
  let selectedFeed = "all";

  let onTagSelected = tag => {
    const tagFeed = {
      id: tag.toLowerCase(),
      name: "#" + tag
    };
    feeds[2] = tagFeed;
    selectedFeed = tagFeed.id;
    ConduitPagesHomeService.fetchArticles({
      limit: 10,
      offset: 0,
      feed: tagFeed
    }).then(dataArticles => (articles = dataArticles));
  };

  let onFeedSelected = onselectedFeed => {
    selectedFeed = onselectedFeed.id;
    ConduitPagesHomeService.fetchArticles({
      limit: 10,
      offset: 0,
      feed: onselectedFeed
    }).then(dataArticles => (articles = dataArticles));
  };

  let onFavoritedArticle = article => {
    console.log(article);
  };

  ConduitPagesHomeService.fetchTags().then(dataTags => (tags = dataTags));
  ConduitPagesHomeService.fetchArticles({
    limit: 10,
    offset: 0,
    feed: { id: "all", name: "Global Feed" }
  }).then(fetchedArticles => (articles = fetchedArticles));
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
