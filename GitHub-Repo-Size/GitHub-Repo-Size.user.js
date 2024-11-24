// ==UserScript==
// @name         GitHub Repo Size
// @namespace    https://github.com/
// @version      1.0
// @description  在 GitHub 仓库页面显示仓库大小信息
// @author       cscnk52 & ChatPGT
// @match        https://github.com/*/*
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// @run-at       document-body
// ==/UserScript==

(function () {
  "use strict";

  if (!/https:\/\/github\.com\/[^\/]+\/[^\/]+$/.test(window.location.href)) {
    return;
  }

  const apiUrl = `https://api.github.com/repos${window.location.pathname}`;

  function fetchRepoSize() {
    GM_xmlhttpRequest({
      method: "GET",
      url: apiUrl,
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Mozilla/5.0",
      },
      onload: function (response) {
        if (response.status === 200) {
          const repoData = JSON.parse(response.responseText);
          if (repoData && repoData.size) {
            displayRepoSize(repoData.size);
          }
        } else {
          console.error("Failed to fetch repo size:", response.statusText);
        }
      },
      onerror: function (error) {
        console.error("Error fetching repo size:", error);
      },
    });
  }

  function displayRepoSize(sizeInKB) {
    const sizeInMB = (sizeInKB / 1024).toFixed(2);

    // 创建新元素
    const sizeElement = document.createElement("div");
    sizeElement.className = "mt-2";

    sizeElement.innerHTML = `
            <a href="#" data-view-component="true" class="Link Link--muted">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo mr-2">
                    <path d="M3.333333 8.333333c0 0.208667 0.308667 0.571 1.02 0.927667C5.402667 9.956667 6.742667 10 8 10c1.257333 0 2.597333-0.043333 3.646667-0.7392 0.713067-0.342933 1.02-0.683733 1.02-0.927667v-1.481067C11.844267 7.747733 9.209867 8 8 8s-3.844267-0.445333-5.018667-1.142133V8.333333z m9.248 1.931267C11.844267 10.963733 9.209867 11.2 8 11.2s-3.844267-0.445333-5.018667-1.142133V11.946667c0 0.208667 0.308667 0.571 1.02 0.927467C5.402667 13.011733 6.742667 13.2 8 13.2c1.257333 0 2.597333-0.043333 3.646667-0.7392 0.713067-0.342933 1.02-0.683733 1.02-0.927467v-1.481067zM2 11.946667V5.333333C2 3.439467 4.686667 2 8 2s6 1.439467 6 3.333333v6.613334c0 1.893867-2.686667 3.333333-6 3.333333s-6-1.439467-6-3.333333z m6-5.12c1.257333 0 2.597333-0.043333 3.646667-0.7392C12.687467 5.705067 13 5.364267 13 5.12c0-0.208667-0.308667-0.571-1.02-0.927467C10.597333 3.522667 9.257333 3.333333 8 3.333333c-1.257333 0-2.597333 0.043333-3.646667 0.7392C3.312533 4.126933 3 4.467733 3 4.712c0 0.208667 0.308667 0.571 1.02 0.927467C5.402667 6.1568 6.742667 6.333333 8 6.333333z"></path>
                </svg>
                <strong>${sizeInMB}</strong>
                MB
            </a>
        `;

    const mt2Elements = document.querySelectorAll("div.mt-2");
    if (mt2Elements.length >= 2) {
      const targetElement = mt2Elements[mt2Elements.length - 1];
      targetElement.parentElement.insertBefore(sizeElement, targetElement);
    } else {
      console.warn("Not enough mt-2 elements to insert repo size.");
    }
  }

  fetchRepoSize();
})();
