
export function getProjectsBySlug(allProjects, selectedSlugs) {
  const projectsBySlug = new Map(
    allProjects.map((project) => [project.slug, project])
  );

  return selectedSlugs.map((slug) => {
    const project = projectsBySlug.get(slug);

    if (!project) {
      throw new Error(
        `Project "${slug}" was not found in ourWork.js`
      );
    }

    return project;
  });
}
