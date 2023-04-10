export const camelCase = (str, splitStr) => {
  return str.split(splitStr).map(item => item.slice(0, 1).toUpperCase() + item.slice(1)).join('')
}

export const genComponentName = (componentPath) => {
  let result = camelCase(componentPath, '/')
  if (result.indexOf('-') >= 0) {
    result = camelCase(result, '-')
  }
  if (result.indexOf('_') >= 0) {
    result = camelCase(result, '_')
  }
  return result
}