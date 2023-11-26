import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMenuTableCommands } from '../../hooks/useCommands'
import './MenuTable.css'

type Props = {
    postsList: string[]
    toggleModal: () => void
}

export function MenuTable({ postsList, toggleModal }: Props) {
    
    const navigate = useNavigate()
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

    const changePathroute = ({ type, article }: { type: string, article?: string }) => {
        article
            ? navigate(`/dashboard/${type}/${article.replace(/\s/g, "-")}`)
            : navigate(`/dashboard/${type}`)
    }

    useMenuTableCommands({ menuRef: menuTable, closeMenu, openMenu })
    
    return (
        <div className='menu-table'>
            <div className="navigation" ref={menuTable}>
                
                <div className="toggle" ref={menuToggle} onClick={toggleMenu}>
                    <span></span>
                </div>
                
                <ul>
                    <li 
                        onClick={() => changePathroute({ type: 'create/new-article' })}
                        style={{'--i': 0} as React.CSSProperties}
                    >
                        <button type='button'>CREATE ARTICLE</button>
                    </li>
                    
                    {postsList.map((post, index) => ( 
                        <li 
                            key={post}
                            style={{'--i': index + 1} as React.CSSProperties} 
                            onClick={() => changePathroute({ type: 'edit', article: post })} 
                        >
                            <button type='button'>{post}</button>
                        </li>
                    ))}
                    
                    <li 
                        onClick={() => changePathroute({ type: 'profile' })}
                        style={{'--i': postsList.length + 1} as React.CSSProperties}
                    >
                        <button type='button'>User profile</button>
                    </li>

                    <li style={{'--i': postsList.length + 2} as React.CSSProperties}>
                        <button type='button' onClick={toggleModal}>Keyboard shortcuts</button>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}