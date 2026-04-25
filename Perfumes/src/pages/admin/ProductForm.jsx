import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminCreateProduct, adminUpdateProduct, uploadImage, deleteImage } from '../../lib/adminApi'
import { fetchProductById, fetchCategories, fetchIntentions } from '../../lib/api'
import { getImageUrl } from '../../lib/storage'

const SIZES = [
  { label: '10ml',  field: 'image_url10ml'  },
  { label: '100ml', field: 'image_url100ml' },
  { label: '120ml', field: 'image_url'       },
  { label: '200ml', field: 'image_url200ml'  },
  { label: '250ml', field: 'image_url250ml'  },
]

const EMPTY = {
  name: '', category_id: '', intention_id: '', short_desc: '', sensory_desc: '',
  price: '', notes: '', size: '', crystal: '', crystal_desc: '', energetic_intention: '',
  recommended_use: '', image_url: '', image_url10ml: '', image_url100ml: '', image_url200ml: '', image_url250ml: '',
  featured: false, active: true, sort_order: 0,
}

const fieldInput = 'w-full px-[14px] py-2.5 border border-gold/30 rounded-md font-sans text-sm text-dark bg-white focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(193,167,121,0.1)]'
const fieldLabel = 'text-xs font-semibold tracking-[1px] uppercase text-[#888]'

export default function ProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [categories, setCategories] = useState([])
  const [intentions, setIntentions] = useState([])
  const [selectedSizes, setSelectedSizes] = useState({ '10ml': false, '100ml': false, '120ml': true, '200ml': false, '250ml': false })
  const [imageFiles, setImageFiles] = useState({})
  const [imagePreviews, setImagePreviews] = useState({})
  const pendingDeletesRef = useRef([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchCategories(), fetchIntentions()]).then(([c, i]) => {
      setCategories(c); setIntentions(i)
    })
    if (isEdit) {
      fetchProductById(id).then((p) => {
        setForm({
          name: p.name || '', category_id: p.category_id || '', intention_id: p.intention_id || '',
          short_desc: p.short_desc || '', sensory_desc: p.sensory_desc || '', price: p.price || '',
          notes: p.notes || '', size: p.size || '', crystal: p.crystal || '', crystal_desc: p.crystal_desc || '',
          energetic_intention: p.energetic_intention || '', recommended_use: p.recommended_use || '',
          image_url: p.image_url || '', image_url10ml: p.image_url10ml || '',
          image_url100ml: p.image_url100ml || '', image_url200ml: p.image_url200ml || '',
          image_url250ml: p.image_url250ml || '',
          featured: p.featured || false, active: p.active ?? true, sort_order: p.sort_order || 0,
        })
        const active = {}
        const previews = {}
        SIZES.forEach(({ label, field }) => {
          active[label] = Boolean(p[field])
          if (p[field]) previews[label] = getImageUrl(p[field])
        })
        if (!Object.values(active).some(Boolean)) active['120ml'] = true
        setSelectedSizes(active)
        setImagePreviews(previews)
      })
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSizeToggle = (label) => {
    const isOn = selectedSizes[label]
    const { field } = SIZES.find(({ label: l }) => l === label)
    const next = { ...selectedSizes, [label]: !isOn }
    const sizeStr = SIZES.filter(({ label: l }) => next[l]).map(({ label: l }) => l).join(' / ')

    setSelectedSizes(next)
    setForm((f) => ({ ...f, size: sizeStr, ...(isOn && { [field]: '' }) }))

    if (isOn) {
      if (form[field]) pendingDeletesRef.current = [...pendingDeletesRef.current, form[field]]
      setImageFiles((f) => { const n = { ...f }; delete n[label]; return n })
      setImagePreviews((p) => { const n = { ...p }; delete n[label]; return n })
    }
  }

  const handleFileChange = (label, e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFiles((f) => ({ ...f, [label]: file }))
    setImagePreviews((p) => ({ ...p, [label]: URL.createObjectURL(file) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const catName = categories.find((c) => c.id == form.category_id)?.name || 'General'
      const folderMap = {
        'Aromas Andinos':      'AromasAndinos',
        'Brumas Áuricas':      'BrumasAuricas',
        'Difusores de Varilla': 'DifusoresVarilla',
        'Difusores para Autos': 'DifusoresAutos',
        'Home Spray':          'HomeSpray',
      }
      const folder = folderMap[catName] || catName.replace(/\s+/g, '')

      for (const path of pendingDeletesRef.current) {
        await deleteImage(path)
      }
      pendingDeletesRef.current = []

      const uploadedUrls = {}
      for (const { label, field } of SIZES) {
        if (imageFiles[label]) {
          const { path } = await uploadImage(imageFiles[label], folder)
          uploadedUrls[field] = path
        } else {
          uploadedUrls[field] = form[field]
        }
      }

      const payload = {
        ...form,
        ...uploadedUrls,
        category_id: form.category_id ? Number(form.category_id) : null,
        intention_id: form.intention_id ? Number(form.intention_id) : null,
        sort_order: Number(form.sort_order),
      }
      if (isEdit) { await adminUpdateProduct(id, payload) } else { await adminCreateProduct(payload) }
      navigate('/admin/productos')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="font-serif text-[1.6rem] text-dark mb-6">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>

      {error && <div className="px-4 py-3 rounded-md mb-4 text-sm bg-[#fef2f2] text-[#d9534f] border border-[#fecaca]">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-[800px]">
        <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Nombre *</label>
            <input name="name" value={form.name} onChange={handleChange} required className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Categoría</label>
            <select name="category_id" value={form.category_id} onChange={handleChange} className={fieldInput}>
              <option value="">— Sin categoría —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Intención</label>
            <select name="intention_id" value={form.intention_id} onChange={handleChange} className={fieldInput}>
              <option value="">— Sin intención —</option>
              {intentions.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Precio</label>
            <input name="price" value={form.price} onChange={handleChange} className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Tamaño</label>
            <input name="size" value={form.size} onChange={handleChange} className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Cristal</label>
            <input name="crystal" value={form.crystal} onChange={handleChange} className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Notas olfativas</label>
            <input name="notes" value={form.notes} onChange={handleChange} className={fieldInput} />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="inline-flex items-center gap-1.5">
              <span className={fieldLabel}>Orden</span>
              <span className="admin-help-trigger relative inline-flex items-center outline-none" tabIndex="0" aria-label="Ayuda sobre el campo orden">
                <span className="material-icons text-base text-gold cursor-help leading-none">error_outline</span>
                <span className="admin-help-tooltip">
                  Define posicion visual de producto dentro del listado. Menor numero aparece antes; mayor numero aparece despues. Ejemplo: 1 primero, 2 despues.
                </span>
              </span>
            </label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} className={fieldInput} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Descripción corta</label>
          <textarea name="short_desc" value={form.short_desc} onChange={handleChange} rows={2} className={`${fieldInput} resize-y`} />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Descripción sensorial</label>
          <textarea name="sensory_desc" value={form.sensory_desc} onChange={handleChange} rows={3} className={`${fieldInput} resize-y`} />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Descripción del cristal</label>
          <textarea name="crystal_desc" value={form.crystal_desc} onChange={handleChange} rows={3} className={`${fieldInput} resize-y`} />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Intención energética</label>
          <textarea name="energetic_intention" value={form.energetic_intention} onChange={handleChange} rows={3} className={`${fieldInput} resize-y`} />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Uso recomendado</label>
          <textarea name="recommended_use" value={form.recommended_use} onChange={handleChange} rows={3} className={`${fieldInput} resize-y`} />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className={fieldLabel}>Tamaños de imagen</label>
          <div className="flex gap-4 flex-wrap mt-1">
            {SIZES.map(({ label }) => (
              <label key={label} className="flex items-center gap-2 text-sm text-[#555] cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes[label] || false}
                  onChange={() => handleSizeToggle(label)}
                  className="w-[18px] h-[18px] accent-gold"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {SIZES.filter(({ label }) => selectedSizes[label]).map(({ label }) => (
          <div key={label} className="flex flex-col gap-1.5 mb-4">
            <label className={fieldLabel}>Imagen {label}</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(label, e)} className={fieldInput} />
            {imagePreviews[label] && (
              <img src={imagePreviews[label]} alt={`Preview ${label}`} className="mt-2 max-w-[200px] max-h-[200px] rounded-lg object-cover" />
            )}
          </div>
        ))}

        <div className="flex gap-6 mb-5">
          <label className="flex items-center gap-2 text-sm text-[#555] cursor-pointer">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-[18px] h-[18px] accent-gold" />
            Destacado
          </label>
          <label className="flex items-center gap-2 text-sm text-[#555] cursor-pointer">
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="w-[18px] h-[18px] accent-gold" />
            Activo
          </label>
        </div>

        <div className="flex gap-3 mt-4">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
          <button
            type="button"
            className="px-9 py-[14px] bg-transparent border border-[#ccc] text-[#555] text-sm tracking-[1px] cursor-pointer hover:border-[#999] hover:text-dark transition-all"
            onClick={() => navigate('/admin/productos')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
