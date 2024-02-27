import { RenderJson } from './RenderJson.jsx'

export const RenderForm = (fields, index) => (
  <form key={index}>{fields.map((field) => RenderJson(field))}</form>
)
