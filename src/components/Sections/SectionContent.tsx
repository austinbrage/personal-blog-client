import Prism from 'prismjs'
import toast from 'react-hot-toast'
import { IoIosCopy } from "react-icons/io"
import { useRef, useLayoutEffect } from 'react'
import type { ContentType, ContentStyles } from '../../types/sections'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import '../../prism-one-dark.css'

type Props = {
    currentData: ContentStyles<string>
}

const compareCodeTypes = (type: ContentType) => {
    return type === 'javascript' || type === 'typescript' || type === 'jsx'
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

    if(compareCodeTypes(currentData.content_type)) return ( 
        <div style={{ display: 'flex', justifyContent: currentData.styles.textAlign }}>
            <div style={currentData.styles as React.CSSProperties}>
                
                <pre ref={codeContainer} className='flex items-start justify-between align-center h-full'>

                    <code className={`language-${currentData.content_type}`}>
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
                
            </div>
        </div>
    )

    if(currentData.content_type === 'blockquote') return (
        <div style={{ display: 'flex', justifyContent: currentData.styles.textAlign }}>
            <blockquote style={currentData.styles as React.CSSProperties} className='!text-left max-[940px]:!w-auto overflow-x-auto'>
           
                <p className='flex items-center h-full ps-4 py-3 rounded-e-xl font-semibold italic leading-loose border-l-4 border-[#374151] bg-neutral-900'>
                    {
                        currentData.content.split('\n').map((elem, index) => (
                            <span key={index} className='block mb-3'> {elem} </span>
                        ))
                    }
                </p>

            </blockquote>
        </div>
    )
    
    if(currentData.content_type === 'image_url' && currentData.image) return (
        <div style={{ display: 'flex', justifyContent: currentData.styles.textAlign }}>
            <img 
                alt={currentData.content} 
                src={currentData.image} 
                style={currentData.styles as React.CSSProperties}
                className='max-[940px]:!w-auto'
            />
        </div>
    )

    return (
        <p style={currentData.styles as React.CSSProperties}>
            {
                currentData.content.split('\n').map((elem, index) => (
                    <span key={index} className='block mb-3'> {elem} </span>
                ))
            }
        </p>
    )
}