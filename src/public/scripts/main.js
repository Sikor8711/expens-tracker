/**
 * @param {Event} evt - The event object from the click event
 * @param {string} tabName - The name of the tab to display
 */
function _changeTab(evt, tabName) {
	const tabcontent = document.getElementsByClassName("tabcontent");
	for (let i = 0; i < tabcontent.length; i++) {
		/** @type {HTMLElement} */
		(tabcontent[i]).style.display = "none";
	}

	const tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
		/** @type {HTMLElement} */
		(tablinks[i]).className = tablinks[i].className.replace("active", "");
	}

	/** @type {HTMLElement | null} */
	const tab = document.getElementById(tabName);
	if (tab) {
		tab.style.display = "block";
	}
	if (evt.currentTarget instanceof HTMLElement) {
		evt.currentTarget.className += " active";
	}
}

/**
 * @param {HTMLObjectElement} el
 * @returns {void}
 */
function _showPassword(el) {
	/** @type {HTMLInputElement | null} */
	if (el) {
		const newEl = el.parentElement?.previousElementSibling;

		if (newEl instanceof HTMLInputElement) {
			if (newEl.type === "password") {
				newEl.type = "text";
			} else {
				newEl.type = "password";
			}
		}
	}
}
