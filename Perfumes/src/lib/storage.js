import { supabase } from './supabase'

const BUCKET = 'Elixire'

/**
 * Returns the public URL for an image stored in the Elixires bucket.
 * @param {string} path - Bucket-relative path, e.g. "DifusoresVarilla/Sonrisa del alma 120ml.jpg"
 */
export function getImageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('/')) return path
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// Returns URL of first available image across all size columns
export function getProductImageUrl(product) {
  if (!product) return ''
  const path = product.image_url || product.image_url10ml || product.image_url100ml || product.image_url200ml || product.image_url250ml || ''
  return getImageUrl(path)
}

export const SIZE_TO_FIELD = {
  '10ml':  'image_url10ml',
  '100ml': 'image_url100ml',
  '120ml': 'image_url',
  '200ml': 'image_url200ml',
  '250ml': 'image_url250ml',
}
