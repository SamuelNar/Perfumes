import { supabase } from './supabase'

const BUCKET = 'Elixire'

// ─── PRODUCTS ─────────────────────────────────────────

export async function adminFetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`*, categories ( id, name ), intentions ( id, name )`)
    .order('sort_order')
  if (error) throw error
  return data
}

export async function adminCreateProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// ─── CATEGORIES ───────────────────────────────────────

export async function adminFetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')
  if (error) throw error
  return data
}

export async function adminCreateCategory(category) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateCategory(id, updates) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteCategory(id) {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
}

// ─── INTENTIONS ───────────────────────────────────────

export async function adminFetchIntentions() {
  const { data, error } = await supabase
    .from('intentions')
    .select('*')
    .order('id')
  if (error) throw error
  return data
}

export async function adminCreateIntention(intention) {
  const { data, error } = await supabase
    .from('intentions')
    .insert(intention)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateIntention(id, updates) {
  const { data, error } = await supabase
    .from('intentions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteIntention(id) {
  const { error } = await supabase.from('intentions').delete().eq('id', id)
  if (error) throw error
}

// ─── IMAGE UPLOAD ─────────────────────────────────────

export async function uploadImage(file, folder) {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
  const path = `${folder}/${fileName}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { path, publicUrl: data.publicUrl }
}

export async function deleteImage(path) {
  if (!path || path.startsWith('http') || path.startsWith('/')) return
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw error
}
