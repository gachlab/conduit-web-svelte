<script>
  export let article;
</script>

<div>
  <div class="article-preview">
    <slot />
    <a class="preview-link" href={article.href}>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        {#if article.tagList}
          {#each article.tagList as tag}
            <li class="tag-default tag-pill tag-outline">{tag}</li>
          {/each}
        {/if}

      </ul>
    </a>
  </div>
</div>
