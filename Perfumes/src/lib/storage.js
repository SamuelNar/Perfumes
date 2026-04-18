import { supabase } from './supabase'

const BUCKET = 'Elixire'

/**
 * Returns the public URL for an image stored in the Elixires bucket.
 * @param {string} path - Bucket-relative path, e.g. "DifusoresVarilla/Sonrisa del alma 120ml.jpg"
 */
export function getImageUrl(path) {
  if (!path) return ''
  // If the path is already a full URL or a local path, return as-is
  if (path.startsWith('http') || path.startsWith('/')) return path
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
