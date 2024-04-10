import { fetchAPI } from '@/utils/fetch-api'
import { TemplateData } from './edit/[id]/page'
import TemplateDisplay from '@/components/home/TemplateDisplay'
import Sidebar from '@/components/layout/sidebar'
import CommonLayout from '@/components/layout/layout'
export interface CategoryData {
  id: number
  attributes: Attributes
}

interface Attributes {
  slug: string
  title: string
  desc: string
  templates: {
    data: TemplateData[]
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
}
export default async function Page() {
  const data: PaginationRes<TemplateData[]> = await fetchAPI('/templates')
  const categories: PaginationRes<CategoryData[]> = await fetchAPI('/categories', { populate: '*' })

  return (
    <div>
      <CommonLayout>
        <TemplateDisplay initData={data.data} categories={categories.data} />
      </CommonLayout>
    </div>
  )
}
