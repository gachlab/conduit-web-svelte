<script>
  export let article;
</script>

<div class="article-meta">
  <a>
    <img alt="Author" src={article.author.image} />
  </a>
  <div class="info">
    <a class="author" href={'#/profile/' + article.author.username}>
      {article.author.username}
    </a>
    <span class="date">{new Date(article.createdAt).toLocaleString()}</span>
  </div>
  <slot />
</div>
