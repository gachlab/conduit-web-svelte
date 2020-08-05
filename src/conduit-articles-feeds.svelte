<script>
  export let feeds;
  export let onSelect;
</script>

{#if feeds}
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      {#each feeds as feed}
        <li class="nav-item">
          <a
            class={feed.isSelected ? 'nav-link active' : 'nav-link'}
            on:click={() => onSelect(feed)}>
            {feed.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}
