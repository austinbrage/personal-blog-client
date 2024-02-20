import React, { useRef, useState, useEffect, useDeferredValue } from 'react'
import { useMenuRadialCommands } from '../../hooks/useCommands'
import { useArticlePublish } from '../../hooks/useArticles'
import { 
    IoMdClose, 
    IoMdCreate, 
    IoIosSettings, 
    IoMdCloudUpload, 
    IoIosCloudDownload 
} from 'react-icons/io'
import './MenuRadial.css'

type Props = {
    enabled: boolean
    demoMode?: boolean
    isPublish?: boolean
    toggleModalEdit: () => void
    toggleModalDelete: () => void
}

type PublishState = {
    status: boolean
    dataText: string
    iconColor: string
}

const PUBLISH_STATE_1: PublishState = {
    status: false,
    dataText: 'Publish Article',
    iconColor: '#04fc43'
}

const PUBLISH_STATE_2: PublishState = {
    status: true,
    dataText: 'Unpublish Article',
    iconColor: '#fe00f1'
}

export function MenuRadial({ demoMode, enabled, isPublish, toggleModalDelete, toggleModalEdit }: Props) {

    const menuRadial = useRef<HTMLUListElement>(null)
    const [publishState, setPublishState] = useState<PublishState>(PUBLISH_STATE_1)
    const publishDeffered = useDeferredValue<PublishState>(publishState)

    const { isPending, publishArticle } = useArticlePublish()

    const toggleMenu = () => menuRadial.current && menuRadial.current.classList.toggle('active')
    const closeMenu = () => menuRadial.current && menuRadial.current.classList.remove('active')
    const openMenu = () => menuRadial.current && menuRadial.current.classList.add('active')

    const togglePublish = () => {
        if(isPending || demoMode === true) return

        (publishState === PUBLISH_STATE_1) 
            ?  setPublishState(PUBLISH_STATE_2)
            :  setPublishState(PUBLISH_STATE_1);
        
        (publishState === PUBLISH_STATE_1) 
            ?  publishArticle({ is_publish: true })
            :  publishArticle({ is_publish: false })
    }
    
    useEffect(() => {
        if(typeof isPublish === 'undefined') return
        isPublish ? setPublishState(PUBLISH_STATE_2) : setPublishState(PUBLISH_STATE_1) 
    }, [isPublish])

    useMenuRadialCommands({ menuRef: menuRadial, closeMenu, openMenu })
    
    return (
        <div className={`menu-radial ${demoMode ? 'menu-radial-demo' : ''}`}>
            <ul className="navigation" ref={menuRadial}>
                
                <li className="toggle" onClick={toggleMenu}>
                    <IoIosSettings/>
                </li>

                <li 
                    onClick={toggleModalDelete}
                    style={{'--i': 0, "--clr": '#ff2972'} as React.CSSProperties}
                    className={enabled ? 'pointer-events-auto' : 'pointer-events-none'}
                >
                    <span data-text="Delete Article" data-pos="top align-right"> 
                        <IoMdClose/> 
                    </span> 
                </li>

                <li 
                    onClick={toggleModalEdit}
                    style={{'--i': 1, "--clr": '#00b0fe', zIndex: -2} as React.CSSProperties}
                    className={enabled ? 'pointer-events-auto' : 'pointer-events-none'}
                >
                    <span data-text="Edit Article Name" data-pos="top align-right"> 
                        <IoMdCreate/> 
                    </span> 
                </li>

                <li 
                    onClick={togglePublish}
                    style={{'--i': 2, "--clr": publishDeffered.iconColor} as React.CSSProperties}
                    className={enabled ? 'pointer-events-auto' : 'pointer-events-none'}
                >
                    <span data-text={publishDeffered.dataText} data-pos="top align-right"> 
                        {publishDeffered.status ? <IoIosCloudDownload/> : <IoMdCloudUpload/>}
                    </span> 
                </li>

            </ul>
        </div>
    )
}
