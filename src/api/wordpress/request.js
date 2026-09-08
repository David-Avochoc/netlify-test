const WORDPRESS_URL = import.meta.env.WORDPRESS_URL;

export async function wpFetch(endpoint) {
    const response = await fetch(
        `${WORDPRESS_URL}${endpoint}`
    );

    if (!response.ok) {
        throw new Error(
            `WordPress API request failed: ${response.status}`
        );
    }

    return response.json();
}