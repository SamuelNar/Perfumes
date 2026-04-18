import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminCreateCategory, adminUpdateCategory, uploadImage } from '../../lib/adminApi'
import { fetchCategories } from '../../lib/api'
import { getImageUrl } from '../../lib/storage'

const EMPTY = {
  name: '',
  phrase: '',
  description: '',
  image_url: '',
  limited: false,
  sort_order: 0,
}

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
          setForm({
            name: cat.name || '',
            phrase: cat.phrase || '',
            description: cat.description || '',
            image_url: cat.image_url || '',
            limited: cat.limited || false,
            sort_order: cat.sort_order || 0,
          })
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

      const payload = {
        ...form,
        sort_order: Number(form.sort_order),
        image_url: imageUrl,
      }

      if (isEdit) {
        await adminUpdateCategory(id, payload)
      } else {
        await adminCreateCategory(payload)
      }

      navigate('/admin/categorias')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="admin-page-title">{isEdit ? 'Editar categoría' : 'Nueva categoría'}</h1>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Nombre *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="admin-field">
            <label>Frase</label>
            <input name="phrase" value={form.phrase} onChange={handleChange} />
          </div>

          <div className="admin-field">
            <label className="admin-label-with-help">
              <span>Orden</span>
              <span className="admin-help-trigger" tabIndex="0" aria-label="Ayuda sobre el campo orden">
                <span className="material-icons admin-help-icon">error_outline</span>
                <span className="admin-help-tooltip">
                  Define posicion visual de categoria en web. Menor numero aparece antes; mayor numero aparece despues. Ejemplo: 1 primero, 2 despues.
                </span>
              </span>
            </label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
          </div>
        </div>

        <div className="admin-field">
          <label>Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
        </div>

        <div className="admin-field">
          <label>Imagen</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="admin-img-preview" />
          )}
        </div>

        <div className="admin-checks">
          <label className="admin-check">
            <input type="checkbox" name="limited" checked={form.limited} onChange={handleChange} />
            Edición limitada
          </label>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear categoría'}
          </button>
          <button type="button" className="admin-btn-cancel" onClick={() => navigate('/admin/categorias')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
