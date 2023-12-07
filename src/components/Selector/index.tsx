import { useEffect, useRef, useState } from 'react'
import { FaBorderAll, FaAlignLeft, FaTextHeight, FaBackspace, FaHamburger } from "react-icons/fa"
import { IoMdText, IoIosColorPalette, IoIosArrowDropupCircle } from "react-icons/io"
import { RxFontFamily, RxMargin } from "react-icons/rx"
import { IoPersonCircleSharp } from "react-icons/io5"
import { RiFontSize2 } from "react-icons/ri"
import { GiWeight } from "react-icons/gi"
import type { EditorTabs } from '../../types/sections'
import './Selector.css'

type Props = {
    identifier: "add" | "change"
    changeEditorTab: (tab: EditorTabs) => void
}

export function Selector({ identifier, changeEditorTab }: Props) {

    const contentHighlight = useRef<HTMLDivElement>(null)
    const [offset, setOffset] = useState<number>(0)

    const handleClick = (offset: number, tab: EditorTabs) => {
        setOffset(offset)
        changeEditorTab(tab)
    }

    const handleMouseEnter = (offset: number) => {
        if(!contentHighlight.current) return
        contentHighlight.current.style.top = `${offset * 54 + 16}px`
    }

    useEffect(() => {
        if(!contentHighlight.current) return
        contentHighlight.current.style.top = `${offset * 54 + 16}px`
    }, [offset])
    

    return (
        <div className="nav-bar">
            <input id={`nav-toggle-${identifier}`} type="checkbox" />
            
            <div className="nav-header">
                <p className="nav-title">Editor</p>
                <label htmlFor={`nav-toggle-${identifier}`}>
                    <span className="nav-toggle-burger"><FaHamburger/></span>
                    <span className="nav-toggle-close"><FaBackspace/></span>
                </label>
                <hr/>
            </div>
            
            <div className="nav-content">
                <div 
                    onClick={() => handleClick(0, 'general')}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><FaBorderAll/></span>
                    <span>General</span>
                </div>
                <div 
                    onClick={() => handleClick(1, 'content')}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><IoMdText/></span>
                    <span>Content</span>
                </div>
                <div 
                    onClick={() => handleClick(2, 'color')}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><IoIosColorPalette/></span>
                    <span>Color</span>
                </div>
                <div 
                    onClick={() => handleClick(3, 'size')}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><RiFontSize2/></span>
                    <span>Size</span>
                </div>
                
                {/* <hr/> */}
                
                <div 
                    onClick={() => handleClick(4, 'family')}
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><RxFontFamily/></span>
                    <span>Family</span>
                </div>
                <div 
                    onClick={() => handleClick(5, 'weight')}
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><GiWeight/></span>
                    <span>Weight</span>
                </div>
                <div 
                    onClick={() => handleClick(6, 'alignment')}
                    onMouseEnter={() => handleMouseEnter(6)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><FaAlignLeft/></span>
                    <span>Alignment</span>
                </div>
                <div 
                    onClick={() => handleClick(7, 'margin')}
                    onMouseEnter={() => handleMouseEnter(7)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><RxMargin/></span>
                    <span>Margin top</span>
                </div>
                
                
                {/* <hr/> */}
                
                <div 
                    onClick={() => handleClick(8, 'line')}
                    onMouseEnter={() => handleMouseEnter(8)}
                    onMouseLeave={() => handleMouseEnter(offset)}
                    className="nav-button"
                >
                    <span className="fas"><FaTextHeight/></span>
                    <span>Line height</span>
                </div>
                <div className="nav-content-highlight" ref={contentHighlight}></div>
            </div>
            
            <input id={`nav-footer-toggle-${identifier}`} type="checkbox" />
            
            <div className="nav-footer">
                <div className="nav-footer-heading">
                    <div className="nav-footer-avatar">
                        <span><IoPersonCircleSharp/></span>
                    </div>
                    <div className="nav-footer-titlebox">
                        <a className="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">
                            Profile
                        </a>
                        <span className="nav-footer-subtitle">Admin</span>
                    </div>
                    <label htmlFor={`nav-footer-toggle-${identifier}`}>
                        <span className="fas"><IoIosArrowDropupCircle/></span>
                    </label>
                </div>
                
                <div className="nav-footer-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
            </div>
            
        </div>
    )   
}