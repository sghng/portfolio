// Client-side only - defines the gh-contribs custom element
// This script runs in the browser, not during Svelte compilation

(function () {
	if (typeof customElements === "undefined") return;
	if (customElements.get("gh-contribs")) return;

	class GithubContribs extends HTMLElement {
		constructor() {
			super();
			this._data = null;
		}

		connectedCallback() {
			if (!this._data) {
				this._load();
			}
		}

		async _load() {
			try {
				const response = await fetch("/gh-contribs.json");
				if (!response.ok) throw new Error("Failed to load");
				const contribs = await response.json();
				this._render(contribs);
			} catch {
				this.innerHTML = "";
			}
		}

		_render(contribs) {
			if (!contribs || contribs.length === 0) {
				this.innerHTML = "";
				return;
			}

			const fragment = document.createDocumentFragment();

			for (const col of contribs) {
				for (const level of col) {
					const cell = document.createElement("div");
					cell.setAttribute("data-level", String(level));
					cell.setAttribute("aria-label", `${level} contributions`);
					fragment.appendChild(cell);
				}
			}

			this.innerHTML = "";
			this.appendChild(fragment);
		}
	}

	customElements.define("gh-contribs", GithubContribs);
})();
