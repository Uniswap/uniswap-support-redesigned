# Copenhagen Theme by Zendesk - Uniswap Support Site

A customized Zendesk Guide theme 'Copenhagen' for Uniswap's support documentation

## Developer Guide

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
zcli login
```

- zcli is a command-line interface tool used to interact with Zendesk products, allowing you to manage and deploy themes. For more information, visit the [zcli documentation](https://developer.zendesk.com/documentation/apps/zcli/).
- Use Uniswap team's Zendesk account credentials
- Access [the login page](https://uniswaplabs.zendesk.com/auth/v2/login/signin?return_to=https%3A%2F%2Fsupport.uniswap.org%2Fhc%2Fen-us%2Fsignin&theme=hc&locale=en-us&brand_id=5291581488781&auth_origin=5291581488781%2Ctrue%2Ctrue)

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
├── styles/          # Tailwind & SCSS styles
└── templates/       # Handlebars templates
```

### Key Features

- **React Components**: Built using Zendesk Garden UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Dark/Light Mode**: Theme switching support

## Deployment

Push changes to the production branch. There is CI pipeline for automated deployment.

## Support

For bug reports and feature requests:

1. Internal team: Create an issue in the repository
2. External users: Contact Zendesk support at https://www.zendesk.com/contact/
