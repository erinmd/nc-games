export const formatCategoryName = categoryName => {
    const nameWithSpaces = categoryName.split('-').join(' ')
    const capitalizedName = nameWithSpaces[0].toUpperCase() + nameWithSpaces.slice(1)
  return capitalizedName
}
