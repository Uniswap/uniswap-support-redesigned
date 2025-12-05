# Copenhagen Theme by Zendesk - Uniswap Support Site

## ‼️Disclaimer: To allow content editors of the Uniswap Support website to edit Handlebars (.hbs) code from the Uniswap lab's Zendesk Guide theme editor interface, we will treat the Handlebars files from the active Zendesk theme on the web as the source of truth.

Please download the Handlebars files from the currently active Zendesk theme and use those files when editing code in this repository.

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
    - Email: User that has access to Uniswap team's Zendesk account
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

### Automated Weekly Deployment

The theme is automatically deployed via GitHub Actions every Sunday at 2 AM UTC. The workflow:

1. **Syncs handlebars from Zendesk** - Downloads the live theme and checks for editor changes
2. **If changes detected** - Creates a PR and blocks deployment until merged
3. **If no changes** - Generates sitemap and updates the live theme

### Manual Deployment (Local Development)

```bash
# Sync handlebars from live theme
yarn sync-theme

# Deploy (builds scripts, generates sitemap, and uploads theme)
yarn deploy
```

### Theme Sync Workflow

Since content editors can modify handlebars files in the Zendesk UI, we automatically sync those changes before deployment:

- **Automatic**: The weekly deployment workflow checks for handlebars changes
- **Manual**: Run `node ./bin/sync-theme-from-zendesk.js` to check for changes via `yarn sync-theme`
- **If changes exist**: A PR is created for review and deployment is blocked

### Environment Variables

**For Local Development** (`.env` file):

- `ZENDESK_EMAIL` - Zendesk admin email
- `ZENDESK_API_TOKEN` - Zendesk API token
- `GITHUB_TOKEN` - GitHub personal access token with `repo` scope (for creating PRs via sync-theme script)

**For CI/CD** (GitHub Secrets):

- `ZENDESK_EMAIL` - Zendesk admin email
- `ZENDESK_API_TOKEN` - Zendesk API token
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions (no setup needed)

## Hard-coded values

These components' text/link elements are hardcoded on code, so codebase owners should assist content editors when they need to change these items.

- Hero title texts(in `templates/home_page.hbs`)
- Colored box block(4 colored boxes right below the hero)(in `templates/home_page.hbs`)
- Footer link items(in `templates/footer.hbs`)

## Support

For bug reports and feature requests:

1. Internal team: Create an issue in the repository
2. External users: Contact Zendesk support at https://www.zendesk.com/contact/
