<script>
  export let pages;
  export let onSelect;
</script>

{#if pages}

  <nav>
    <ul class="pagination">
      {#each pages as page}
        <li class={`page-item ${page.isSelected ? 'active' : ''}`}>
          <a
            href="javascript:void(0)"
            class="page-link"
            on:click={() => onSelect(page.value)}>
            {page.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
