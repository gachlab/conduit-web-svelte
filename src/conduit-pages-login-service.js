import ConduitAppService from "./conduit-app-service.js";

const login = (input) =>
  fetch("https://conduit.productionready.io/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      user: {
        email: input.email,
        password: input.password,
      },
    }),
  }).then((response) =>
    !response.ok
      ? response.json().then((response) => console.log(response) || response)
      : input
  );

export default {
  login,
};
