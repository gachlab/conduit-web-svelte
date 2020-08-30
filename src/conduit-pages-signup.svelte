<script>
  import ConduitSignupPageService from "./conduit-pages-signup-service";

  let state = undefined;

  const onSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    ConduitSignupPageService.signup({
      username: form.get("username"),
      email: form.get("email"),
      password: form.get("password"),
    })
      .then(setState)
      .then(() => (!state.errors ? push("/") : undefined));
  };
  const setState = (input) => (state = Object.assign({}, input));

  ConduitSignupPageService.init().then(setState);
</script>

<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign Up</h1>
        <p class="text-xs-center">
          <a class="" href="#login">Have an account?</a>
        </p>
        {#if state && state.errors.length > 0}
          <ul class="error-messages">
            {#each state.errors as error}
              <li>{error.text}</li>
            {/each}
          </ul>
        {/if}

        <form on:submit={onSubmit}>
          <fieldset>
            <fieldset class="form-group">
              <input
                bind:value={state.username}
                name="username"
                type="text"
                class="form-control form-control-lg"
                placeholder="Username" />
            </fieldset>
            <fieldset class="form-group">
              <input
                bind:value={state.email}
                name="email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input
                bind:value={state.password}
                name="password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Sign Up
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
