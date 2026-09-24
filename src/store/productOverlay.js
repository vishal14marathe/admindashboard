// Since DummyJSON doesn't persist add/edit/delete, we keep changes in
// localStorage so the UI reflects them. This is the "optimistic overlay".
const KEY = 'product_overlay_v1';

function read() {
    if (typeof window === 'undefined') return { added: [], edited: {}, deleted: [] };
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : { added: [], edited: {}, deleted: [] };
    } catch {
        return { added: [], edited: {}, deleted: [] };
    }
}

function write(data) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(KEY, JSON.stringify(data));
    }
}

export function getOverlay() {
    return read();
}

export function applyOverlay(products) {
    const { added, edited, deleted } = read();
    const deletedSet = new Set(deleted);

    const merged = products
        .filter((p) => !deletedSet.has(p.id))
        .map((p) => (edited[p.id] ? { ...p, ...edited[p.id] } : p));

    // Put newly added products at the top
    return [...added.filter((p) => !deletedSet.has(p.id)), ...merged];
}

export function addProduct(product) {
    const data = read();
    data.added.unshift({ ...product, id: Date.now() }); // temp id
    write(data);
}

export function editProduct(id, updates) {
    const data = read();
    const addedIndex = data.added.findIndex((p) => p.id === id);
    if (addedIndex >= 0) {
        data.added[addedIndex] = { ...data.added[addedIndex], ...updates };
    } else {
        data.edited[id] = { ...(data.edited[id] || {}), ...updates };
    }
    write(data);
}

export function deleteProduct(id) {
    const data = read();
    data.added = data.added.filter((p) => p.id !== id);
    if (!data.deleted.includes(id)) data.deleted.push(id);
    write(data);
}

export function getMergedProduct(apiProduct) {
    const { edited, deleted } = read();
    if (deleted.includes(apiProduct.id)) return null;
    if (edited[apiProduct.id]) return { ...apiProduct, ...edited[apiProduct.id] };
    return apiProduct;
}