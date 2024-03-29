import React, { useRef } from 'react'
import { panelTour } from "../../utils/driver"
import { useNavigate } from 'react-router-dom'
import { useMenuTableCommands } from '../../hooks/useCommands'
import { useMenuTablePagination } from '../../hooks/usePagination'
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"
import './MenuTable.css'
import '../../driver.css'

type Props = {
    demoMode?: boolean
    postsList: string[]
    toggleModal: () => void
}

export function MenuTable({ demoMode, postsList, toggleModal }: Props) {
    
    const perPage = 3

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
        if(demoMode === true) return
        article
            ? navigate(`/dashboard/${type}/${article.replace(/\s/g, "-")}`)
            : navigate(`/dashboard/${type}`)
    }

    useMenuTableCommands({ menuRef: menuTable, closeMenu, openMenu })

    const { 
        mustPaginate, 
        currentPage,
        totalPages, 
        goNextPage, 
        goPrevPage, 
        hasNext, 
        hasPrev
    } = useMenuTablePagination({ postsList, perPage})

    return (
        <div className={`menu-table ${demoMode ? 'menu-table-demo' : ''}`}>
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
                    
                    {postsList.map((post, index) => { 
                        const calc = (index + 1) - ((currentPage - 1) * perPage) 

                        if(mustPaginate && (index + 1) > perPage * currentPage) return
                        if(mustPaginate && index < perPage * (currentPage - 1)) return

                        return (
                            <li 
                                key={post}
                                style={{'--i': mustPaginate ? calc : index + 1} as React.CSSProperties} 
                                onClick={() => changePathroute({ type: 'edit', article: post })} 
                            >
                                <button type='button'>{post}</button>
                            </li>
                        ) 
                    })}

                    {(mustPaginate && currentPage === totalPages && postsList.length !== totalPages * perPage) && (
                        [...Array((totalPages * perPage) - postsList.length)].map((_, index) => index).reverse().map((elem) => (
                            <li 
                                key={elem}
                                style={{'--i': perPage - elem} as React.CSSProperties}
                            >
                                <button 
                                    type='button' 
                                    className='!text-[#242424] pointer-events-none'
                                >
                                        Non-used text
                                </button>
                            </li>
                        ))
                    )}

                    <li 
                        onClick={() => changePathroute({ type: 'profile' })}
                        style={{'--i': mustPaginate ? perPage + 1 : postsList.length + 1} as React.CSSProperties}
                    >
                        <button type='button'>[ User profile ]</button>
                    </li>

                    {mustPaginate && (
                        <li
                            className='flex'
                            style={{'--i': perPage + 2} as React.CSSProperties}
                        >
                            <button 
                                type='button'
                                disabled={!hasPrev()}
                                onClick= {() => goPrevPage()} 
                                className={`
                                    !grid place-content-center 
                                    ${hasPrev() 
                                        ? 'pointer-events-auto text-[#848181] bg-[#242424]' 
                                        : 'pointer-events-none !text-[#343434] !bg-[#1D1D1F]'
                                    }
                                `}
                            >
                                <BiSolidLeftArrow/>
                            </button>
                            <button 
                                type='button' 
                                disabled={!hasNext()}
                                onClick= {() => goNextPage()} 
                                className={`
                                    !grid place-content-center 
                                    ${hasNext() 
                                        ? 'pointer-events-auto text-[#848181] bg-[#242424]' 
                                        : 'pointer-events-none !text-[#343434] !bg-[#1D1D1F]'
                                    }
                                `}
                            >
                                <BiSolidRightArrow/>
                            </button>
                        </li>
                    )}

                    <li 
                        className='flex'
                        style={{'--i': mustPaginate ? perPage + 3 : postsList.length + 2} as React.CSSProperties}
                    >
                        <button type='button' onClick={() => panelTour.drive()}>Guide</button>
                        <button type='button' onClick={toggleModal}>shortcuts</button>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}