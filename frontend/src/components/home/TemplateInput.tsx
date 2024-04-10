'use client'

import { TemplateData } from '@/app/edit/[id]/page'
import { CategoryData } from '@/app/page'
import { fetchAPI } from '@/utils/fetch-api'
import { Button, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Dispatch, SetStateAction, useState } from 'react'

const TemplateInput = ({
  categoryId,
  cat,
  setData,
}: {
  categoryId: string
  cat: CategoryData
  setData: Dispatch<SetStateAction<CategoryData>>
}) => {
  const [template, setTemplate] = useState('')
  const [messageApi, contextHolder] = message.useMessage()

  const handleSubmit = () => {
    if (!template) {
      return messageApi.error('Must enter mjml codes')
    }
    fetchAPI(
      '/templates',
      {},
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            content: template,
            category: categoryId,
          },
        }),
      }
    ).then((res: PaginationRes<TemplateData>) => {
      // success alert
      messageApi.success('Success!')
      setTemplate('')
      // TODO immer
      const newCat = {
        ...cat,
        attributes: {
          ...cat.attributes,
          templates: {
            data: [...cat.attributes.templates.data, res.data],
          },
        },
      }
      setData(newCat)
    })
  }

  return (
    <div>
      {contextHolder}
      <TextArea value={template} rows={10} onChange={(e) => setTemplate(e.target.value)} />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default TemplateInput
