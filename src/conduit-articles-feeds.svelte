<script>
  export let feeds;
  export let selected;
  export let onSelect;
</script>

<div class="feed-toggle">
  <ul class="nav nav-pills outline-active">
    {#each feeds as feed}
      <li class="nav-item">
        <a
          class={feed.id === selected ? 'nav-link active' : 'nav-link'}
          on:click={() => onSelect(feed)}>
          {feed.name}
        </a>
      </li>
    {/each}
  </ul>
</div>
;
