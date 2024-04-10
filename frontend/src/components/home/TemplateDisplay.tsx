'use client'

import { TemplateData } from '@/app/edit/[id]/page'
import { useState } from 'react'
import { CategoryData } from '@/app/page'
import React from 'react'
import { Tabs } from 'antd'
import CategoryContainer from './CategoryContainer'

const onChange = (key: string) => {
  console.log(key)
}

const TemplateDisplay = ({ initData, categories }: { initData: TemplateData[]; categories: CategoryData[] }) => {
  const [data, setData] = useState(categories)
  console.log(categories)
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={categories.map((cat) => ({
          key: cat.attributes.slug,
          label: cat.attributes.title,
          children: <CategoryContainer initData={cat} />,
        }))}
        onChange={onChange}
      />

      <div className="flex justify-center">
        <a href="https://mjml.io/templates" target="_blank" rel="noreferrer">
          Search for more templates
        </a>
      </div>
    </div>
  )
}

export default TemplateDisplay
