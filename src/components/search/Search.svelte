<div>
    <input
        type="text"
        id="search-input"
        hx-get="/api/search"
        hx-vals='js:{"q": document.getElementById("search-input").value.length > 2 ? document.getElementById("search-input").value : null}'
        hx-trigger="keyup changed delay:500ms"
        hx-target="#search-result"
        placeholder="Search content..."
        class="border-violet-80 mb-2 mt-2 w-full rounded border-2 bg-transparent p-2 text-white"
    />

    <div id="search-result"></div>
</div>