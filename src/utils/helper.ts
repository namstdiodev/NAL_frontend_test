export function isMappable(array: any) {
  if (Array.isArray(array)) return array.length > 0;
  return false;
}

export const htmlToPlainText = (html: string) => {
  const strippedHtml = html.replace(/<[^>]+>/g, '');
  return strippedHtml
}