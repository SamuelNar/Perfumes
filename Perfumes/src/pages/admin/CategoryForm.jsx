import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminCreateCategory, adminUpdateCategory, uploadImage } from '../../lib/adminApi'
import { fetchCategories } from '../../lib/api'
import { getImageUrl } from '../../lib/storage'

const EMPTY = { name: '', phrase: '', description: '', image_url: '', limited: false, sort_order: 0 }

const fieldInput = 'w-full px-[14px] py-2.5 border border-gold/30 rounded-md font-sans text-sm text-dark bg-white focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(193,167,121,0.1)]'
const fieldLabel = 'text-xs font-semibold tracking-[1px] uppercase text-[#888]'

export default function CategoryForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchCategories().then((cats) => {
        const cat = cats.find((c) => c.id == id)
        if (cat) {
          setForm({ name: cat.name || '', phrase: cat.phrase || '', description: cat.description || '', image_url: cat.image_url || '', limited: cat.limited || false, sort_order: cat.sort_order || 0 })
          if (cat.image_url) setImagePreview(getImageUrl(cat.image_url))
        }
      })
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      let imageUrl = form.image_url
      if (imageFile) {
        const folder = form.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
        const { path } = await uploadImage(imageFile, folder || 'Categorias')
        imageUrl = path
      }
      const payload = { ...form, sort_order: Number(form.sort_order), image_url: imageUrl }
      if (isEdit) { await adminUpdateCategory(id, payload) } else { await adminCreateCategory(payload) }
      navigate('/admin/categorias')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="font-serif text-[1.6rem] text-dark mb-6">{isEdit ? 'Editar categoría' : 'Nueva categoría'}</h1>

      {error && <div className="px-4 py-3 rounded-md mb-4 text-sm bg-[#fef2f2] text-[#d9534f] border border-[#fecaca]">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-[800px]">
        <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Nombre *</label>
            <input name="name" value={form.name} onChange={handleChange} required className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Frase</label>
            <input name="phrase" value={form.phrase} onChange={handleChange} className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="inline-flex items-center gap-1.5">
              <span className={fieldLabel}>Orden</span>
              <span className="admin-help-trigger relative inline-flex items-center outline-none" tabIndex="0" aria-label="Ayuda sobre el campo orden">
                <span className="material-icons text-base text-gold cursor-help leading-none">error_outline</span>
                <span className="admin-help-tooltip">
                  Define posicion visual de categoria en web. Menor numero aparece antes; mayor numero aparece despues. Ejemplo: 1 primero, 2 despues.
                </span>
              </span>
            </label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} className={fieldInput} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${fieldInput} resize-y`} />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Imagen</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className={fieldInput} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 max-w-[200px] max-h-[200px] rounded-lg object-cover" />}
        </div>

        <div className="flex gap-6 mb-5">
          <label className="flex items-center gap-2 text-sm text-[#555] cursor-pointer">
            <input type="checkbox" name="limited" checked={form.limited} onChange={handleChange} className="w-[18px] h-[18px] accent-gold" />
            Edición limitada
          </label>
        </div>

        <div className="flex gap-3 mt-4">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear categoría'}
          </button>
          <button
            type="button"
            className="px-9 py-[14px] bg-transparent border border-[#ccc] text-[#555] text-sm tracking-[1px] cursor-pointer hover:border-[#999] hover:text-dark transition-all"
            onClick={() => navigate('/admin/categorias')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
