// import Editor from '@/components/editor'
import dynamic from 'next/dynamic'
import { fetchAPI } from '@/utils/fetch-api'

interface Meta {
  pagination: {
    start: number
    limit: number
    total: number
  }
}

export interface Template {
  data: TemplateData
  meta: Meta
}

export interface TemplateData {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt: string
    slug: string
    content: string
  }
}

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

export default async function Page({ params }: { params: { id: string } }) {
  let data: Template | null = null
  const fetchData = async (start: number, limit: number) => {
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_ALL_API_TOKEN
      const path = `/templates/${params.id}`
      const urlParamsObject = {
        sort: { createdAt: 'desc' },
        populate: {
          cover: { fields: ['url'] },
          category: { populate: '*' },
          authorsBio: {
            populate: '*',
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      }
      const options = { headers: { Authorization: `Bearer ${token}` } }
      const responseData: Template = await fetchAPI(path, urlParamsObject, options)

      return responseData
    } catch (error) {
      console.error(error)
    }
  }

  const res = await fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
  if (res) {
    data = res
  }

  return <Editor defaultContent={data ? data.data.attributes.content : ''} />
}
