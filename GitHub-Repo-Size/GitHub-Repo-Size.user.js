// ==UserScript==
// @name         GitHub Repo Size
// @namespace    https://github.com/
// @version      1.1
// @description  在 GitHub 仓库页面显示仓库大小信息
// @license      MIT
// @author       cscnk52 & ChatPGT
// @match        https://github.com/*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @connect      api.github.com
// @run-at       document-body
// ==/UserScript==

(function () {
  "use strict";

  if (!/https:\/\/github\.com\/[^\/]+\/[^\/]+$/.test(window.location.href)) {
    return;
  }

  const token = GM_getValue("token", null);
  const apiUrl = `https://api.github.com/repos${window.location.pathname}`;

  GM_registerMenuCommand("config token", function () {
    const currentToken = token
      ? `current Token: ${token}`
      : "No Token configured";
    const newToken = prompt(`${currentToken}\nEnter new Token:`);

    if (newToken) {
      GM_setValue("token", newToken);
      alert("Token update!");
    } else if (newToken === "") {
      alert("Token unchanged!");
    }
  });

  function fetchRepoSize() {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: apiUrl,
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Mozilla/5.0",
          Authorization: `Bearer ${token}`,
        },
        onload: function (response) {
          if (response.status === 200) {
            const repoData = JSON.parse(response.responseText);
            if (repoData && repoData.size) {
              let size = repoData.size;
              let sizeDisplay;

              if (size >= 0.9 * 1024 * 1024) {
                sizeDisplay = (size / (1024 * 1024)).toFixed(2) + " GB";
              } else if (size >= 0.9 * 1024) {
                sizeDisplay = (size / 1024).toFixed(2) + " MB";
              } else {
                sizeDisplay = size.toFixed(2) + " KB";
              }

              resolve(sizeDisplay);
            } else {
              resolve("Size not available");
            }
          } else if (response.status === 401) {
            resolve("Error: Token invalid");
          } else if (response.status === 403) {
            resolve("Error: Token permissions are insufficient");
          } else if (response.status === 429) {
            resolve(
              "Error: GitHub API limit reached. Configure a token to fix.",
            );
          } else {
            resolve(`Error: HTTP Code ${response.status}`);
          }
        },
        onerror: function (error) {
          reject(`Error: ${error}`);
        },
      });
    });
  }

  async function displayRepoSize() {
    try {
      const text = await fetchRepoSize();
      const formattedText = text.replace(
        /(\d+(\.\d+)?)/g,
        "<strong>$1</strong>",
      );
      const sizeElement = document.createElement("div");
      sizeElement.className = "mt-2";

      sizeElement.innerHTML = `
            <a href="#" data-view-component="true" class="Link Link--muted">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-size mr-2">
                    <path d="M3.333333 8.333333c0 0.208667 0.308667 0.571 1.02 0.927667C5.402667 9.956667 6.742667 10 8 10c1.257333 0 2.597333-0.043333 3.646667-0.7392 0.713067-0.342933 1.02-0.683733 1.02-0.927667v-1.481067C11.844267 7.747733 9.209867 8 8 8s-3.844267-0.445333-5.018667-1.142133V8.333333z m9.248 1.931267C11.844267 10.963733 9.209867 11.2 8 11.2s-3.844267-0.445333-5.018667-1.142133V11.946667c0 0.208667 0.308667 0.571 1.02 0.927467C5.402667 13.011733 6.742667 13.2 8 13.2c1.257333 0 2.597333-0.043333 3.646667-0.7392 0.713067-0.342933 1.02-0.683733 1.02-0.927467v-1.481067zM2 11.946667V5.333333C2 3.439467 4.686667 2 8 2s6 1.439467 6 3.333333v6.613334c0 1.893867-2.686667 3.333333-6 3.333333s-6-1.439467-6-3.333333z m6-5.12c1.257333 0 2.597333-0.043333 3.646667-0.7392C12.687467 5.705067 13 5.364267 13 5.12c0-0.208667-0.308667-0.571-1.02-0.927467C10.597333 3.522667 9.257333 3.333333 8 3.333333c-1.257333 0-2.597333 0.043333-3.646667 0.7392C3.312533 4.126933 3 4.467733 3 4.712c0 0.208667 0.308667 0.571 1.02 0.927467C5.402667 6.1568 6.742667 6.333333 8 6.333333z"></path>
                </svg>
                ${formattedText}
            </a>
        `;

      const mt2Divs = document.querySelectorAll("div.mt-2");

      mt2Divs.forEach((div) => {
        if (div.querySelector("svg.octicon.octicon-repo-forked.mr-2")) {
          div.insertAdjacentElement("afterend", sizeElement);
          return;
        }
      });
    } catch (error) {
      console.error("Error displaying repo size:", error);
    }
  }

  displayRepoSize();
})();
