# zoapp-front &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zoapp/front/blob/master/LICENSE)
Javascript ES7 React Zoapp frontend client

## Getting started

### Prerequisites

First of all, make sure you have [Node 8.x](https://nodejs.org/en/download/) and
[Yarn](https://yarnpkg.com/en/docs/install) installed.

This project requires a backend application to start. At the moment, you have to
install this [backend application](https://github.com/Zoapp/backend) by yourself.
In the following, we assume this backend application runs locally and is
available at: `127.0.0.1:8081`.

### Usage

1 . Create a minimal react application

    TODO create a minimal project

    ```
    import React from "react";
    import { Front, Screen } from "zoapp-front";

    const app = {
      name: "Zoapp",
      version: "0.1.0",
      design: {
        drawer: {
          type: "persistent",
          themeDark: true,
        },
      },
      screens: [
        {
          id: "1",
          to: "/",
          icon: "dashboard",
          name: "Dashboard",
          access: "auth",
          path: "/",
          panels: ["Panel 1", "Panel 2"],
          toolbox: ["todo"],
          render: props => React.createElement(Screen, props, "Dashboard"),
        },
        {
          id: "2",
          to: "/admin",
          icon: "settings",
          name: "Admin",
          path: "/admin",
          access: "auth",
          panels: ["General", "Extensions", "Users", "Advanced"],
          render: props => React.createElement(Screen, props, "Admin"),
        },
        {
          id: "3",
          to: "/",
          icon: "home",
          name: "Home",
          path: "*",
          access: "public",
          render: props => React.createElement(Screen, props, "Home"),
        },
        {
          id: "4",
          to: "/help",
          name: "Help",
          icon: "help",
          path: "/help",
          access: "all",
          render: props => React.createElement(Screen, props, "Help"),
        },
      ],
    };

    const front = new Front("app", app, config);

    front.start();

    ```

2 . Add zoapp-front to dependencies

3 . Install

    ```
    $ yarn install
    ```

2. Register a new client application on the backend application in order to
   obtain client ID/secret and allow authentication:

    ```
    $ curl -H "Content-Type: application/json" -X POST \
        -d '{ "name": "Your Client Name", "email": "hello@example.org", "grant_type": "password", "redirect_uri": "http://127.0.0.1:8080" }' \
        http://127.0.0.1:8081/auth/application
    ```

You should receive a response with credentials that will be needed in the next
step.

Also you need to create a first user : TODO process

3. Create a configuration file named `config/default.json` with the following
   content:

    ``` json
   {
        "backend": {
            "api": {
                "host": "127.0.0.1",
                "port": "8081",
                "path": "api/v1/"
            },
            "auth": {
                "clientId": "<YOUR CLIENT ID>",
                "clientSecret": "<YOUR CLIENT SECRET>",
                "host": "127.0.0.1",
                "port": "8081",
                "path": "auth/"
            },
            "secure": false
        }
    }
    ```

4. Start the dev environment:

    ```
    $ yarn dev
    ```

This application should be available at: http://127.0.0.1:8080/.

## Contributing

Please, see the [CONTRIBUTING](CONTRIBUTING.md) file.


## Contributor Code of Conduct

Please note that this project is released with a [Contributor Code of
Conduct](http://contributor-covenant.org/). By participating in this project you
agree to abide by its terms. See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) file.


## License

zoapp-front is released under the MIT License. See the bundled
[LICENSE](LICENSE) file for details.