import { supabase } from './supabase'

// Simple in-memory cache to avoid redundant API calls
const cache = {}
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function cached(key, fetcher) {
  const entry = cache[key]
  if (entry && Date.now() - entry.ts < CACHE_TTL) {
    return Promise.resolve(entry.data)
  }
  return fetcher().then(data => {
    cache[key] = { data, ts: Date.now() }
    return data
  })
}

export function fetchProducts() {
  return cached('products', async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories ( id, name, phrase, description, image_url, limited, sort_order ),
        intentions ( id, name, phrase, icon )
      `)
      .order('sort_order')
    if (error) throw error
    return data
  })
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories ( id, name, phrase, description, image_url, limited, sort_order ),
      intentions ( id, name, phrase, icon )
    `)
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export function fetchCategories() {
  return cached('categories', async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (error) throw error
    return data
  })
}

export function fetchIntentions() {
  return cached('intentions', async () => {
    const { data, error } = await supabase
      .from('intentions')
      .select('*')
      .order('id')
    if (error) throw error
    return data
  })
}

export function fetchFeaturedProducts() {
  return cached('featured', async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories ( id, name ),
        intentions ( id, name )
      `)
      .eq('featured', true)
      .order('sort_order')
      .limit(4)
    if (error) throw error
    return data
  })
}
