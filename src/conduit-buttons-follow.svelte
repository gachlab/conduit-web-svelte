<script>
  export let profile;
  export let follow;
</script>

<button
  class="btn btn-sm action-btn {profile.following ? 'btn-secondary' : 'btn-outline-secondary'}"
  on:click={() => follow(profile)}>
  <i class="ion-plus-round" />
  &nbsp; {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
</button>
