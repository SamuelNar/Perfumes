import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  adminCreateProduct,
  adminUpdateProduct,
  uploadImage,
} from '../../lib/adminApi'
import { fetchProductById, fetchCategories, fetchIntentions } from '../../lib/api'
import { getImageUrl } from '../../lib/storage'

const EMPTY = {
  name: '',
  category_id: '',
  intention_id: '',
  short_desc: '',
  sensory_desc: '',
  price: '',
  notes: '',
  size: '',
  crystal: '',
  crystal_desc: '',
  energetic_intention: '',
  recommended_use: '',
  image_url: '',
  featured: false,
  active: true,
  sort_order: 0,
}

export default function ProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [categories, setCategories] = useState([])
  const [intentions, setIntentions] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchCategories(), fetchIntentions()]).then(([c, i]) => {
      setCategories(c)
      setIntentions(i)
    })
    if (isEdit) {
      fetchProductById(id).then((p) => {
        setForm({
          name: p.name || '',
          category_id: p.category_id || '',
          intention_id: p.intention_id || '',
          short_desc: p.short_desc || '',
          sensory_desc: p.sensory_desc || '',
          price: p.price || '',
          notes: p.notes || '',
          size: p.size || '',
          crystal: p.crystal || '',
          crystal_desc: p.crystal_desc || '',
          energetic_intention: p.energetic_intention || '',
          recommended_use: p.recommended_use || '',
          image_url: p.image_url || '',
          featured: p.featured || false,
          active: p.active ?? true,
          sort_order: p.sort_order || 0,
        })
        if (p.image_url) setImagePreview(getImageUrl(p.image_url))
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
        const catName = categories.find((c) => c.id == form.category_id)?.name || 'General'
        const folderMap = {
          'Aromas Andinos': 'AromasAndinos',
          'Brumas Áuricas': 'BrumasAuricas',
          'Difusores de varillas': 'DifusoresVarilla',
          'Difusores p/ autos': 'DifusoresAutos',
          'Home Spray': 'HomeSpray',
        }
        const folder = folderMap[catName] || catName.replace(/\s+/g, '')
        const { path } = await uploadImage(imageFile, folder)
        imageUrl = path
      }

      const payload = {
        ...form,
        category_id: form.category_id ? Number(form.category_id) : null,
        intention_id: form.intention_id ? Number(form.intention_id) : null,
        sort_order: Number(form.sort_order),
        image_url: imageUrl,
      }

      if (isEdit) {
        await adminUpdateProduct(id, payload)
      } else {
        await adminCreateProduct(payload)
      }

      navigate('/admin/productos')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="admin-page-title">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Nombre *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="admin-field">
            <label>Categoría</label>
            <select name="category_id" value={form.category_id} onChange={handleChange}>
              <option value="">— Sin categoría —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="admin-field">
            <label>Intención</label>
            <select name="intention_id" value={form.intention_id} onChange={handleChange}>
              <option value="">— Sin intención —</option>
              {intentions.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          <div className="admin-field">
            <label>Precio</label>
            <input name="price" value={form.price} onChange={handleChange} />
          </div>

          <div className="admin-field">
            <label>Tamaño</label>
            <input name="size" value={form.size} onChange={handleChange} />
          </div>

          <div className="admin-field">
            <label>Cristal</label>
            <input name="crystal" value={form.crystal} onChange={handleChange} />
          </div>

          <div className="admin-field">
            <label>Notas olfativas</label>
            <input name="notes" value={form.notes} onChange={handleChange} />
          </div>

          <div className="admin-field">
            <label className="admin-label-with-help">
              <span>Orden</span>
              <span className="admin-help-trigger" tabIndex="0" aria-label="Ayuda sobre el campo orden">
                <span className="material-icons admin-help-icon">error_outline</span>
                <span className="admin-help-tooltip">
                  Define posicion visual de producto dentro del listado. Menor numero aparece antes; mayor numero aparece despues. Ejemplo: 1 primero, 2 despues.
                </span>
              </span>
            </label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} />
          </div>
        </div>

        <div className="admin-field">
          <label>Descripción corta</label>
          <textarea name="short_desc" value={form.short_desc} onChange={handleChange} rows={2} />
        </div>

        <div className="admin-field">
          <label>Descripción sensorial</label>
          <textarea name="sensory_desc" value={form.sensory_desc} onChange={handleChange} rows={3} />
        </div>

        <div className="admin-field">
          <label>Descripción del cristal</label>
          <textarea name="crystal_desc" value={form.crystal_desc} onChange={handleChange} rows={3} />
        </div>

        <div className="admin-field">
          <label>Intención energética</label>
          <textarea name="energetic_intention" value={form.energetic_intention} onChange={handleChange} rows={3} />
        </div>

        <div className="admin-field">
          <label>Uso recomendado</label>
          <textarea name="recommended_use" value={form.recommended_use} onChange={handleChange} rows={3} />
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
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Destacado
          </label>
          <label className="admin-check">
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
            Activo
          </label>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
          <button type="button" className="admin-btn-cancel" onClick={() => navigate('/admin/productos')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
