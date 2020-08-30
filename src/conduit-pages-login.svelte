<script>
  import { push } from "svelte-spa-router";
  import ConduitLoginPageService from "./conduit-pages-login-service";

  const onSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    ConduitLoginPageService.login(() => push("/"))({
      email: form.get("email"),
      password: form.get("password"),
    });
  };
</script>

<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign In</h1>
        <p class="text-xs-center">
          <a class="" href="#register">Need an account?</a>
        </p>
        <form on:submit={onSubmit}>
          <fieldset>
            <fieldset class="form-group">
              <input
                name="email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input
                name="password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Sign in
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
