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

2. Set up a Cloudflare Pages application
    * Open your [Cloudflare dashboard](https://dash.cloudflare.com).
    * Go to _Workers & Pages_ and _Create application_.
    * Go to the _Settings_ tab for your Pages application>_Environment variables_>_Production_>_Edit variables_
      ```TOML
      # Change to your own API URL
      API = "https://quiz-7ff.pages.dev/api"
      # Use the language code of your preferred language
      LANGUAGE = "en"
      ```
      > **Note**
      > To set up your API server, go to [Quiz-API](https://github.com/Carlgo11/Quiz-API).
3. Deploy website
    ```BASH
    # Publish website to Cloudflare Pages
    wrangler pages deploy .vercel/output/static
    ```

## License

The project is licensed under GPLv3. See the full license [here](LICENSE).
