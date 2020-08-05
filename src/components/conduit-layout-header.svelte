<script>
  export let home;
  export let links;
</script>

<nav class="navbar navbar-light">
  <div class="container">
    <a class="navbar-brand" href={home.href}>{home.title}</a>
    <ul class="nav navbar-nav pull-xs-right">
      {#each links as link (link.href)}
        <li class="nav-item">
          <a class="nav-link" href={link.href}>{link.text}</a>
        </li>
      {/each}

    </ul>
  </div>
</nav>
