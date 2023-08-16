# Quiz

**Quiz answer form**

This project allows quiz participants to easily answer the questions on their mobile devices.  
Just share the site URL and the answers can be tracked in real time with scoreboard information for the organizer.

## Installation

1. Download and build the website
    ```bash
    # Fetch repository
    git clone https://github.com/Carlgo11/Quiz
    cd Quiz

    # Install dependencies
    npm i

    # Build website
    npx @cloudflare/next-on-pages@1
    ```

## Deployment

This project is meant to be hosting on a Next.js hosting services such as Vercel or Cloudflare Pages.
Below is information for how to set up on the different alternatives.

### Vercel

1. Set up and deploy the project
  * Go to the [Vercel Dashboard](https://vercel.com/dashboard) and _Add New..._ > _Project_.
  * Import your git fork of this project.
  * When asked for environment variables, enter the variables listed in [API Variables](#api-variables).
  * Save and wait for Vercel to build your website.
  * If the build was successful, you should get a vercel.app subdomain for the project. To use your own domain, simply
    point a CNAME record to that vercel.app subdomain.
   > **Note**
   > To set up your API server, go to [Quiz-API](https://github.com/Carlgo11/Quiz-API).

### Cloudflare Pages

> **Warning**
> Hosting this project on Cloudflare Pages currently does not work.
> This is due to Cloudflare not supporting
> the [cache property](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache) for the Fetch API.

1. Set up the project
    * Open your [Cloudflare dashboard](https://dash.cloudflare.com).
    * Go to _Workers & Pages_ and _Create application_.
   * Go to the _Settings_ tab for your Pages application>_Environment variables_>_Production_>_Edit variables_ and enter
     the variables listed in [API Variables](#api-variables).
     > **Note**
      > To set up your API server, go to [Quiz-API](https://github.com/Carlgo11/Quiz-API).

2. Deploy the website
    ```BASH
    # Publish website to Cloudflare Pages
    wrangler pages deploy .vercel/output/static
    ```

## API Variables

| Name                 | Content      | Example                          | Required |
|----------------------|--------------|----------------------------------|:--------:|
| NEXT_PUBLIC_API      | Your API URL | `https://quiz-7ff.pages.dev/api` |   Yes    |
| NEXT_PUBLIC_LANGUAGE | `en` or `sv` | `en`                             |    No    |

## License

The project is licensed under GPLv3. See the full license [here](LICENSE).
