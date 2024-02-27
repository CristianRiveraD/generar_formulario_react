import { useState, useEffect } from 'react'
import { RenderJson } from '../funciones/RenderJson.jsx'
import { RenderForm } from '../funciones/RenderForm.jsx'
import miJSON from '../../forms.json'

export function DynamicForm() {
  const [formFields, setFormFields] = useState([])
  const [readedData, setReadedData] = useState(null)
  const [savedData, setSavedData] = useState(null)
  const [deletedData, setDeletedData] = useState(false)

  useEffect(() => {
    getDataFetch()
  }, [savedData, deletedData])

  const getDataFetch = () => {
    fetch('http://localhost:3000/form/read-form')
      .then((response) => response.json())
      .then((data) => {
        setReadedData(data)
      })
      .catch((error) => console.error('Error:', error))
  }

  const deleteDataFetch = (id) => {
    setDeletedData(false)
    fetch(`http://localhost:3000/form/delete-form/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('error al aliminar elemento')
        }
        if (response.status === 204) {
          setDeletedData(true)
        } else {
          return response.json()
        }
      })
      .catch((error) => console.error(error.message))
  }

  const handleSubmit = () => {
    fetch('http://localhost:3000/form/create-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(miJSON)
    })
      .then((response) => response.json())
      .then((data) => setSavedData(data))
      .catch((error) => console.error('Error:', error))
  }

  const handleDelete = (id) => {
    deleteDataFetch(id)
  }

  useEffect(() => {
    const fields = miJSON?.data?.map((data) => data.section) ?? [] // extrallendo los campos del json si existen y su no
    setFormFields(fields)
  }, [miJSON]) // se ejecuta cada vez que el json cambia

  return (
    <div>
      <div>
        {formFields.map((section, index) => RenderForm(section.fields, index))}
        <button onClick={handleSubmit}> guardar </button>
      </div>
      <div>
        <div>
          {readedData?.forms?.map((form) => (
            <div key={form._id}>
              {form?.data?.map((data, index) =>
                RenderForm(data?.section?.fields, index)
              )}
              <button onClick={() => handleDelete(form._id)}>borrar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
