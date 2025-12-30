// ===================================
// GLOBAL STATE
// ===================================
let washData = {};
let currentCategory = 'all';
let searchTerm = '';

// ===================================
// INITIALIZE APP
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadWashData();
    setupEventListeners();
});

// ===================================
// LOAD DATA
// ===================================
async function loadWashData() {
    try {
        const response = await fetch('wash_frequency.json');
        washData = await response.json();
        renderItems();
        loadSources();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ===================================
// SET UP EVENT LISTENERS
// ===================================
function setupEventListeners() {
    // Category navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            selectCategory(category, item);
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderItems();
    });

    // Sources modal
    const sourcesBtn = document.getElementById('sourcesBtn');
    const sourcesModal = document.getElementById('sourcesModal');
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.querySelector('.modal-overlay');

    sourcesBtn.addEventListener('click', () => {
        sourcesModal.classList.remove('hidden');
        sourcesBtn.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        sourcesModal.classList.add('hidden');
        sourcesBtn.classList.remove('active');
    });

    modalOverlay.addEventListener('click', () => {
        sourcesModal.classList.add('hidden');
        sourcesBtn.classList.remove('active');
    });
}

// ===================================
// CATEGORY SELECTION
// ===================================
function selectCategory(category, navItem) {
    currentCategory = category;

    // Clear search when selecting a category
    searchTerm = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    // Update active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    navItem.classList.add('active');

    // Update category title
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryNames = {
        'all': 'All Items',
        'core_items': 'Core Items',
        'towels': 'Towels',
        'socks': 'Socks',
        'innerwear_and_sleepwear': 'Innerwear & Sleepwear',
        'athletic_and_performance_wear': 'Athletic Wear',
        'formal_and_workwear': 'Formal & Workwear',
        'outerwear': 'Outerwear',
        'accessories': 'Accessories',
        'footwear_fabrics': 'Footwear Fabrics',
        'seasonal_and_layering': 'Seasonal & Layering',
        'specialty_and_cultural_wear': 'Cultural Wear',
        'miscellaneous': 'Miscellaneous'
    };
    categoryTitle.textContent = categoryNames[category] || 'Items';

    // Render items
    renderItems();
}

// ===================================
// RENDER ITEMS
// ===================================
function renderItems() {
    const tbody = document.getElementById('itemsTableBody');
    const noResults = document.getElementById('noResults');
    tbody.innerHTML = '';

    let items = [];

    // If searching, always search ALL categories
    if (searchTerm) {
        Object.keys(washData).forEach(category => {
            Object.entries(washData[category]).forEach(([name, frequency]) => {
                if (name.toLowerCase().includes(searchTerm) ||
                    frequency.toLowerCase().includes(searchTerm)) {
                    items.push({ name, frequency });
                }
            });
        });
    } else {
        // Get items based on selected category (when not searching)
        if (currentCategory === 'all') {
            // Get all items from all categories
            Object.keys(washData).forEach(category => {
                Object.entries(washData[category]).forEach(([name, frequency]) => {
                    items.push({ name, frequency });
                });
            });
        } else if (washData[currentCategory]) {
            // Get items from specific category
            Object.entries(washData[currentCategory]).forEach(([name, frequency]) => {
                items.push({ name, frequency });
            });
        }
    }

    // Sort items alphabetically
    items.sort((a, b) => a.name.localeCompare(b.name));

    // Show/hide no results message
    if (items.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    // Render items
    items.forEach(item => {
        const row = createTableRow(item.name, item.frequency);
        tbody.appendChild(row);
    });
}

// ===================================
// CREATE TABLE ROW
// ===================================
function createTableRow(name, frequency) {
    const row = document.createElement('tr');
    const icon = getItemIcon(name);

    row.innerHTML = `
        <td>
            <div class="item-name">
                <div class="item-icon">${icon}</div>
                <span>${name}</span>
            </div>
        </td>
        <td>
            <div class="item-frequency-text">${frequency}</div>
        </td>
    `;

    return row;
}

// ===================================
// GET ITEM ICON
// ===================================
function getItemIcon(itemName) {
    const iconMap = {
        // Towels
        'Bath towel': '🛁',
        'Hand towel': '🧼',
        'Face towel': '🧼',
        'Gym towel': '🏋️',
        'Beach towel': '🏖️',
        'Washcloth': '🧼',

        // Socks
        'Casual socks': '🧦',
        'Ankle socks': '🧦',
        'No-show socks': '🧦',
        'Crew socks': '🧦',
        'Dress socks': '🧦',
        'Sports socks': '🧦',
        'Compression socks': '🧦',
        'Wool socks': '🧦',

        // Innerwear & Sleepwear
        'Vests / undershirts': '👕',
        'Thermal innerwear': '🧥',
        'Pyjamas': '🛌',
        'Nightwear / lounge pants': '🛌',

        // Athletic
        'Gym T-shirts': '🏃',
        'Track pants': '🏃',
        'Compression wear': '🏃',
        'Sports shorts': '🩳',
        'Sports innerwear': '🏃',
        'Sweatbands / headbands': '🏃',

        // Formal & Workwear
        'Formal trousers': '👔',
        'Blazers / suit jackets': '🤵',
        'Waistcoats': '🤵',
        'Dress shirts': '👔',
        'Neckties': '👔',
        'Bow ties': '👔',

        // Outerwear
        'Overcoats': '🧥',
        'Windcheaters': '🧥',
        'Rain jackets': '🌧️',
        'Parkas': '🧥',
        'Ponchos': '🌧️',

        // Accessories
        'Caps / hats': '🧢',
        'Beanies': '🧢',
        'Scarves / mufflers': '🧣',
        'Bandanas': '🧣',
        'Fabric belts': '👖',

        // Footwear
        'Fabric slippers': '👟',
        'Washable shoe insoles': '👟',

        // Seasonal
        'Cardigans': '🧥',
        'Long-sleeve tees': '👕',
        'Base layers': '👕',

        // Cultural Wear
        'Kurtas': '👘',
        'Pajamas (kurta set bottoms)': '👘',
        'Dhotis': '👘',
        'Lungis': '👘',
        'Pathani suits': '👘',
        'Sherwanis': '👘',

        // Miscellaneous
        'Reusable cloth masks': '😷',
        'Handkerchiefs': '🧻',

        // Core Items
        'Handkerchief': '🧻',
        'Socks': '🧦',
        'Gloves': '🧤',
        'Jackets': '🧥',
        'Shirts': '👔',
        'T-shirts': '👕',
        'Shorts': '🩳',
        'Boxers': '🩲',
        'Underwear / Briefs': '🩲',
        'Pants': '👖',
        'Jeans': '👖',
        'Joggers': '👖',
        'Sweaters': '🧥',
        'Hoodies': '🧥'
    };

    return iconMap[itemName] || '👕';
}

// ===================================
// LOAD SOURCES
// ===================================
async function loadSources() {
    try {
        const response = await fetch('sources.txt');
        const text = await response.text();
        const sources = parseSources(text);
        renderSources(sources);
    } catch (error) {
        console.error('Error loading sources:', error);
    }
}

// ===================================
// PARSE SOURCES
// ===================================
function parseSources(text) {
    const lines = text.split('\n');
    const sources = [];

    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;

        // Format: "Title, accessed December 30, 2025, https://..."
        const parts = line.split(', accessed ');
        if (parts.length === 2) {
            const title = parts[0];
            // parts[1] is: "December 30, 2025, https://..."
            const dateAndUrl = parts[1].split(', ');

            if (dateAndUrl.length >= 3) {
                // dateAndUrl[0] = "December 30"
                // dateAndUrl[1] = "2025"
                // dateAndUrl[2+] = URL parts
                const date = `${dateAndUrl[0]}, ${dateAndUrl[1]}`; // "December 30, 2025"
                const url = dateAndUrl.slice(2).join(', ').trim(); // URL from index 2

                sources.push({
                    title: title,
                    url: url,
                    date: date
                });
            }
        }
    });

    return sources;
}

// ===================================
// RENDER SOURCES
// ===================================
function renderSources(sources) {
    const container = document.getElementById('sourcesContent');
    const list = document.createElement('ol');
    list.className = 'sources-list';

    sources.forEach((source, index) => {
        const item = document.createElement('li');
        item.className = 'source-item';

        item.innerHTML = `
            <span class="source-number">${index + 1}</span>
            <strong>${source.title}</strong><br>
            <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="source-link">${source.url}</a>
            <span class="source-date">${source.date}</span>
        `;

        list.appendChild(item);
    });

    container.appendChild(list);
}
