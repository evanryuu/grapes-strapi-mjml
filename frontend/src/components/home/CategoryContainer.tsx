import { CategoryData } from '@/app/page'
import Link from 'next/link'
import { useState } from 'react'
import TemplateInput from './TemplateInput'

const CategoryContainer = ({ initData }: { initData: CategoryData }) => {
  const [cat, setCategory] = useState(initData)

  return (
    <>
      <div className="w-screen py-12 flex items-center justify-center gap-6">
        {cat.attributes.templates.data.map((v) => (
          <Link key={v.id} href={`/edit/${v.id}`}>
            Template {v.id}
          </Link>
        ))}
      </div>
      <div className="px-6">
        <TemplateInput categoryId={cat.attributes.slug} cat={cat} setData={setCategory} />
      </div>
    </>
  )
}

export default CategoryContainer
