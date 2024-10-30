# Puppeteer Login Script for Auth0 Attack Protection Demo

This script demonstrates a simulated login attempt to test Auth0's attack protection features using multiple user credentials in a headless browser environment. It uses Puppeteer to automate browser interactions, simulating login failures and successes for demo purposes.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **Puppeteer**: This script requires Puppeteer, which you can install via npm.

## Installation

1. Clone the repository or create a new file with this script.
2. Install Puppeteer by running the following command:
   ```bash
   npm install puppeteer
   ```

## Usage

1. Update the `URL` variable with the target website's URL.
2. Define the `USERS` array with usernames and passwords for the login attempt.
3. Run the script with:
   ```bash
   node <script_name>.js
   ```

## Script Explanation

- **headless**: Runs Puppeteer in a visible browser window (`headless: false`) for demonstration. Adjust to `headless: true` for silent, background execution.
- **context.newPage()**: Opens a new page for each user attempt, clearing cookies, cache, and storage to ensure each session is isolated.
- **Login Flow**:
  - Opens the login page, fills out the credentials, and submits.
  - Detects login success or failure based on expected error codes.
- **Logging**: Provides feedback in the console about each login attempt.

## Important Notes

- This script simulates login behaviour for testing purposes only. Ensure compliance with the target site’s security policies and usage guidelines.
- Modify `page.locator` selectors based on the login form’s structure if necessary.

## Example Output

```
Login failed for: user1@example.com - Invalid password
Login successful for: user2@example.com
```

## Troubleshooting

- **Selector Errors**: Ensure selectors (e.g., `#username`, `#password`) match the site's DOM.
- **Timeouts**: Adjust `page.setDefaultTimeout` if page loading times vary.
- **Browser Context**: If using a proxy, update Puppeteer launch arguments.

## License

This script is intended for educational and demo purposes only. Unauthorized testing on third-party websites may violate their terms of service.
