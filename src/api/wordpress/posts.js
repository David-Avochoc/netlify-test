import { wpFetch } from "./request.js";


function formatPost(post) {
    const featuredMedia =
        post._embedded?.["wp:featuredmedia"]?.[0];

    return {
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        date: post.date,
        modified: post.modified,

        image: featuredMedia?.source_url || null,

        imageAlt:
            featuredMedia?.alt_text ||
            post.title.rendered
    };
}


export async function getPosts() {
    const posts = await wpFetch(
        "/wp-json/wp/v2/posts?_embed"
    );

    return posts.map(formatPost);
}


export async function getPostBySlug(slug) {
    const posts = await wpFetch(
        `/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );

    if (!posts.length) {
        return null;
    }

    return formatPost(posts[0]);
}