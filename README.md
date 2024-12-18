# Copenhagen Theme by Zendesk - Uniswap Support Site

A customized Zendesk Guide theme 'Copenhagen' for Uniswap's support site

### Stack

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Zendesk Guide

### Zendesk Theme Customization

For detailed information on customizing the Zendesk theme, refer to the [Zendesk Theme Documentation](https://github.com/zendesk/copenhagen_theme).

### Local Development

1. **Install Dependencies**

```bash
yarn install
```

2. **Login to Zendesk Account**

```bash
zcli login -i
```

- zcli is a command-line interface tool used to interact with Zendesk products, allowing you to manage and deploy themes. For more information, visit the [zcli documentation](https://developer.zendesk.com/documentation/apps/zcli/).
  - To login to zcli, use Uniswap team's Zendesk account credentials to login
    - Subdomain: uniswaplabs
    - API token: use existing one if you have one saved or create a new one from Zendesk
- Access the [Zendesk login page](https://uniswaplabs.zendesk.com/auth/v2/login/signin?return_to=https%3A%2F%2Fsupport.uniswap.org%2Fhc%2Fen-us%2Fsignin&theme=hc&locale=en-us&brand_id=5291581488781&auth_origin=5291581488781%2Ctrue%2Ctrue) via Browser to preview the page

3. **Start Development Server**

```bash
yarn start
```

This will:

- Compile TypeScript and React components
- Watch for changes
- Start preview server

### Project Structure

```
src/
├── modules/          # React components
├── styles/          # Tailwind & SCSS styles(use `main.css` to override existing Zendesk theme styles)
└── templates/       # Handlebars templates
```

### Key Features

- **React Components**: Built using Zendesk Garden UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Dark/Light Mode**: Theme switching support

## Deployment

1. Push changes to the `master` branch.
2. Run the command below to upload the theme to the production Zendesk Guide site.

```bash
node ./bin/theme-upload.js
```

CI pipeline for automated deployment is not available since theme related commands cannot use Zendesk environment variables for zcli(Mentioned [here](https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/#supported-authentication-schemes))

## Hard-coded values

These components' text/link elements are hardcoded on code, so codebase owners should assist content editors when they need to change these items.

- Hero title texts(in `templates/home_page.hbs`)
- Colored box block(4 colored boxes right below the hero)(in `templates/home_page.hbs`)
- Footer link items(in `templates/footer.hbs`)

## Support

For bug reports and feature requests:

1. Internal team: Create an issue in the repository
2. External users: Contact Zendesk support at https://www.zendesk.com/contact/
