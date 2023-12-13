import Prism from 'prismjs'
import toast from 'react-hot-toast'
import { IoIosCopy } from "react-icons/io"
import { useRef, useLayoutEffect } from 'react'
import { type ContentStyles } from '../../types/sections'
import '../../prism-one-dark.css'

type Props = {
    currentData: ContentStyles
}

export function SectionContent({ currentData }: Props) {

    const codeContainer = useRef<HTMLPreElement>(null)
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentData.content)
        toast.success('Code copied successfully')
    }
    
    useLayoutEffect(() => {
        if(!codeContainer?.current) return
        Prism.highlightAllUnder(codeContainer.current)
    }, [codeContainer, currentData])

    if(currentData.content_type === 'javascript') return (
        
        <pre ref={codeContainer} className='flex items-start justify-between'>

            <code className="language-javascript">
                {currentData.content}
            </code>

            <button 
                type='button' 
                data-text="Copy" 
                data-pos="top align-left" 
                onClick={copyToClipboard}
                className='flex items-center justify-center self-end !rounded-lg transition-all duration-300 before:hidden after:hidden hover:!scale-110'
            >
                <span className='cursor-pointer text-lg scale-75'>
                    <IoIosCopy/>
                </span>
            </button>

        </pre>

    )

    if(currentData.content_type === 'blockquote') return (
        <blockquote className='ps-4 py-3 rounded-e-xl font-semibold italic leading-loose border-l-4 border-[#374151] text-white bg-neutral-900'>
            {
                currentData.content.split('\n').map((elem, index) => (
                    <span key={index} className='block mb-3'> {elem} </span>
                ))
            }
        </blockquote>
    )
    
    if(currentData.content_type === 'image' && currentData.image_url) return (
        <img alt={currentData.content} src={currentData.image_url} />
    )

    return currentData.content.split('\n').map((elem, index) => (
        <span key={index} className='block mb-3'> {elem} </span>
    ))
}