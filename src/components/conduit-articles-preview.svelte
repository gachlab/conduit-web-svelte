<script>
  import ConduitTagsList from "./conduit-tags-list.svelte";
  let isOutlined = true;
  export let article;
</script>

<div>
  <div class="article-preview">
    <slot />
    <a class="preview-link" href={'#/articles/' + article.slug}>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
      <ConduitTagsList bind:tags={article.tagList} bind:isOutlined />
    </a>
  </div>
</div>
