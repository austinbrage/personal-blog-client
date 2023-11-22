import React, { useRef } from 'react'
import { useMenuTableCommands } from '../../hooks/useCommands'
import './MenuTable.css'

type Props = {
    postsList: string[]
    toggleModal: () => void
}

export function MenuTable({ postsList, toggleModal }: Props) {
    
    const menuTable = useRef<HTMLDivElement>(null)
    const menuToggle = useRef<HTMLDivElement>(null)

    const toggleMenu = () => {
        menuTable.current && menuTable.current.classList.toggle('active')
        menuToggle.current && menuToggle.current.classList.toggle('active')
    }
    const closeMenu = () => {
        menuTable.current && menuTable.current.classList.remove('active')
        menuToggle.current && menuToggle.current.classList.remove('active')
    }
    const openMenu = () => {
        menuTable.current && menuTable.current.classList.add('active')
        menuToggle.current && menuToggle.current.classList.add('active')
    }

    useMenuTableCommands({ menuRef: menuTable, closeMenu, openMenu })
    
    return (
        <div className='menu-table'>
            <div className="navigation" ref={menuTable}>
                
                <div className="toggle" ref={menuToggle} onClick={toggleMenu}>
                    <span></span>
                </div>
                
                <ul>
                    <li style={{'--i': 0} as React.CSSProperties}>
                        <a href='#'>CREATE ARTICLE</a>
                    </li>
                    
                    {postsList.map((post, index) => ( 
                        <li style={{'--i': index + 1} as React.CSSProperties} key={post}>
                            <a href='#'>{post}</a>
                        </li>
                    ))}
                    
                    <li style={{'--i': postsList.length + 1} as React.CSSProperties}>
                        <a href='#'>User profile</a>
                    </li>

                    <li style={{'--i': postsList.length + 2} as React.CSSProperties}>
                        <a onClick={toggleModal} >Keyboard shortcuts</a>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}