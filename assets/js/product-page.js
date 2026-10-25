document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[role="tablist"]').forEach(function (tabList) {
        const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

        function selectTab(tab) {
            tabs.forEach(function (item) {
                const isSelected = item === tab;
                item.setAttribute("aria-selected", String(isSelected));
                item.tabIndex = isSelected ? 0 : -1;

                const panel = document.getElementById(item.getAttribute("aria-controls"));
                if (panel) panel.hidden = !isSelected;
            });
        }

        tabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
                selectTab(tab);
            });

            tab.addEventListener("keydown", function (event) {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();

                const currentIndex = tabs.indexOf(tab);
                let nextIndex = currentIndex;

                if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
                if (event.key === "Home") nextIndex = 0;
                if (event.key === "End") nextIndex = tabs.length - 1;

                tabs[nextIndex].focus();
                selectTab(tabs[nextIndex]);
            });
        });
    });

    const navToggle = document.querySelector(".nav-toggle");
    const header = document.querySelector("header");
    const nav = document.querySelector("header nav");

    if (navToggle && header && nav) {
        navToggle.addEventListener("click", function () {
            const isOpen = header.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                header.classList.remove("nav-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});
