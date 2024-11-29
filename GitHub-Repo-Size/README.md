# GitHub Repo Size

`GitHub Repo Size` is a userscript that allows you to quickly view the size of a GitHub repository directly from its page. This tool adds a size indicator to the repository interface, making it easier for developers and collaborators to get an overview of the repository's size without needing to clone or download the repository.

## Features

- Displays the total size of the repository (including all branches and tags) directly on the GitHub repository page.
- No need to clone or manually check the repository size, saving time and improving workflow efficiency.
- Easy to install and use with any modern web browser that supports userscripts.

## Installation

### Prerequisites

- A modern browser (Chrome, Firefox, Edge, etc.)
- A userscript manager (e.g., [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/))

### Install UserScript:

1. Install Tampermonkey or Greasemonkey extension in your browser.
2. Download the `GitHub Repo Size` userscript:
   - [Download from GitHub](https://github.com/cscnk52/UserScript/raw/refs/heads/main/GitHub-Repo-Size/GitHub-Repo-Size.user.js)
3. Click the "Install" button below to automatically add the userscript to your userscript manager.

### Configure token

1. Open [token page](https://github.com/settings/personal-access-tokens/new).
2. Enter token name `GitHub-Repo-Size`.
3. Select Expiration (Recommend select `No expiration`).
4. Select Repository access (Recommend `All repositories`).
5. Select `Permissions` -> `Repository permissions` -> `Metadata` -> `ACCESS: Read-only`.
6. click `Generate token`.
7. copy generated token to clipboard.
8. click Tampermonkey, find `GitHub-Repo-Size`, click `config token`.
9. Enter token, Click `ok`.
10. All done, enjoy!

## Usage

Once the script is installed, navigate to any GitHub repository. The size of the repository will appear in a new location on the page, typically near the repository description.

## Contributing

Feel free to fork this project and submit pull requests if you want to contribute new features or improvements!

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.
