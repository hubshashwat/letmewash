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

    // Mobile Sidebar
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuBtn && sidebar && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('hidden'); // Toggle hidden class
            // Use setTimeout to allow display:block to apply before opacity transition if we were using visible class
            // For now, simple hidden toggle is fine based on CSS
            mobileOverlay.classList.toggle('visible');
        });

        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            mobileOverlay.classList.add('hidden');
            mobileOverlay.classList.remove('visible');
        });
    }
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

    // Close sidebar on mobile if open
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (mobileOverlay) {
            mobileOverlay.classList.add('hidden');
            mobileOverlay.classList.remove('visible');
        }
    }
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
                let matches = false;
                const searchLower = searchTerm.toLowerCase();

                if (name.toLowerCase().includes(searchLower)) {
                    matches = true;
                } else if (typeof frequency === 'string') {
                    if (frequency.toLowerCase().includes(searchLower)) matches = true;
                } else if (typeof frequency === 'object' && frequency !== null) {
                    // Search in material names and their frequencies
                    const combinedText = Object.entries(frequency)
                        .map(([mat, freq]) => `${mat} ${freq}`)
                        .join(' ')
                        .toLowerCase();
                    if (combinedText.includes(searchLower)) matches = true;
                }

                if (matches) {
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
            </div>
        </td>
        <td>
            <div class="item-frequency-text">${formatFrequency(frequency)}</div>
        </td>
    `;

    return row;
}

// ===================================
// FORMAT FREQUENCY
// ===================================
function formatFrequency(frequency) {
    if (typeof frequency !== 'object' || frequency === null) {
        return frequency;
    }

    // Handle material-specific frequencies
    let html = '<ul class="material-list">';
    Object.entries(frequency).forEach(([material, freq]) => {
        html += `
            <li class="material-item">
                <span class="material-name">${material}:</span>
                <span class="material-freq">${freq}</span>
            </li>
        `;
    });
    html += '</ul>';

    return html;
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
        // Use a more robust regex to handle variations
        // Matches: Title + ", accessed " + Date + ", " + URL
        const pattern = /(.+?),\s*accessed\s+(.+?),\s*(https?:\/\/.+)/i;
        const match = line.match(pattern);

        if (match) {
            const title = match[1].trim();
            const date = match[2].trim();
            const url = match[3].trim();

            sources.push({
                title: title,
                url: url,
                date: date
            });
        } else {
            // Fallback for simple comma separation if "accessed" is missing or different
            // Assuming: Title, Date, URL
            const parts = line.split(',');
            if (parts.length >= 3) {
                // Try to find the part looking like a URL
                const urlIndex = parts.findIndex(p => p.trim().startsWith('http'));
                if (urlIndex > 0) {
                    const url = parts.slice(urlIndex).join(',').trim();
                    const date = parts[urlIndex - 1].trim();
                    const title = parts.slice(0, urlIndex - 1).join(',').trim();
                    sources.push({ title, url, date });
                }
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
