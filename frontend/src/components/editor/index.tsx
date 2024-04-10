'use client'

import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'
import plugin from './mjml'
import { useEffect, useRef } from 'react'

const Editor = ({ defaultContent }: { defaultContent: string }) => {
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const editor = grapesjs.init({
      height: '100%',
      noticeOnUnload: false,
      storageManager: false,
      container: el.current!,
      plugins: [plugin],
      pluginsOpts: {
        [plugin.name]: {},
      },
    })

    editor.setComponents(defaultContent)
  }, [])
  return (
    <div
      id="gjs"
      ref={el}
      style={{
        height: 0,
        overflow: 'hidden',
      }}
    ></div>
  )
}

export default Editor
