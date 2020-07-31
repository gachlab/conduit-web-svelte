<script>
  export let onSubmit;
  export let author;
  let comment;
</script>

{#if !author}
  <p>
    <a href="/login">Sign in</a>
    or
    <a href="/register">sign up</a>
    to add comments on this article.
  </p>
{/if}

{#if author}
  <form
    class="card comment-form ng-untouched ng-pristine ng-valid"
    novalidate=""
    on:submit={event => event.preventDefault() || onSubmit(comment)}>
    <fieldset>
      <div class="card-block">
        <textarea
          class="form-control ng-pristine ng-valid ng-touched"
          placeholder="Write a comment..."
          rows="3"
          on:keyup={event => (comment = event.target.value)} />
      </div>
      <div class="card-footer">
        <img class="comment-author-img" src={author.image} alt="author" />
        <a class="comment-author" href="/profile/{author.username}">
          {author.username}
        </a>
        <button class="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </fieldset>
  </form>
{/if}
