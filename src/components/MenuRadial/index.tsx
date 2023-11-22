import React, { useRef, useState, useDeferredValue } from 'react'
import { useMenuRadialCommands } from '../../hooks/useCommands'
import { 
    IoMdClose, 
    IoMdCreate, 
    IoIosSettings, 
    IoMdCloudUpload, 
    IoIosCloudDownload 
} from 'react-icons/io'
import './MenuRadial.css'

type Porps = {
    toggleModalDelete: () => void
    toggleModalEdit: () => void
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

export function MenuRadial({ toggleModalDelete, toggleModalEdit }: Porps) {

    const menuRadial = useRef<HTMLUListElement>(null)
    const [publishState, setPublishState] = useState<PublishState>(PUBLISH_STATE_1)
    const publishDeffered = useDeferredValue<PublishState>(publishState)

    const toggleMenu = () => menuRadial.current && menuRadial.current.classList.toggle('active')
    const closeMenu = () => menuRadial.current && menuRadial.current.classList.remove('active')
    const openMenu = () => menuRadial.current && menuRadial.current.classList.add('active')

    const togglePublish = () => setPublishState((prevState) => {
        return (prevState === PUBLISH_STATE_1)
            ? PUBLISH_STATE_2
            : PUBLISH_STATE_1
    })

    // const togglePublish = () => setTimeout(() => {
    //     (publishState === PUBLISH_STATE_1)
    //         ? setPublishState(PUBLISH_STATE_2)
    //         : setPublishState(PUBLISH_STATE_1)
    // }, 1000)
    
    useMenuRadialCommands({ menuRef: menuRadial, closeMenu, openMenu })
    
    return (
        <div className="menu-radial">
            <ul className="navigation" ref={menuRadial}>
                
                <li className="toggle" onClick={toggleMenu}>
                    <IoIosSettings/>
                </li>

                <li 
                    onClick={toggleModalDelete}
                    style={{'--i': 0, "--clr": '#ff2972'} as React.CSSProperties}
                >
                    <span data-text="Delete Article" data-pos="top align-right"> 
                        <IoMdClose/> 
                    </span> 
                </li>

                <li 
                    onClick={toggleModalEdit}
                    style={{'--i': 1, "--clr": '#00b0fe', zIndex: -2} as React.CSSProperties}
                >
                    <span data-text="Edit Article Name" data-pos="top align-right"> 
                        <IoMdCreate/> 
                    </span> 
                </li>

                <li 
                    onClick={togglePublish}
                    style={{'--i': 2, "--clr": publishDeffered.iconColor} as React.CSSProperties} 
                >
                    <span data-text={publishDeffered.dataText} data-pos="top align-right"> 
                        {publishDeffered.status ? <IoIosCloudDownload/> : <IoMdCloudUpload/>}
                    </span> 
                </li>

            </ul>
        </div>
    )
}
