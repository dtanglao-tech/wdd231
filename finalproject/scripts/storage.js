const FAVORITES_KEY = "cellfix-favorites";

export function getFavorites() {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        const favorites = stored ? JSON.parse(stored) : [];
        return Array.isArray(favorites) ? favorites : [];
    } catch (error) {
        console.error("Unable to read favorites:", error);
        return [];
    }
}

export function saveFavorites(favorites) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Unable to save favorites:", error);
    }
}

export function toggleFavorite(serviceId) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.includes(serviceId)
        ? favorites.filter((id) => id !== serviceId)
        : [...favorites, serviceId];

    saveFavorites(updatedFavorites);
    return updatedFavorites;
}