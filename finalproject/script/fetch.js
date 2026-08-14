export async function getServices() {
    try {
        const response = await fetch("data/services.json")

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const services = await response.json();

        return services;
    } catch (error) {
        console.error("Unable to load services:", error);

        throw error;
        
    }
}