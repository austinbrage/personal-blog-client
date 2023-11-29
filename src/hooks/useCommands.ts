import React, { useEffect } from 'react'

type KeyCommands1 = {
    menuRef: React.RefObject<HTMLUListElement>
    openMenu: () => void
    closeMenu: () => void
}

type KeyCommands2 = {
    menuRef: React.RefObject<HTMLDivElement>
    openMenu: () => void
    closeMenu: () => void
}

type KeyCommands3 = {
    menuRef: React.RefObject<HTMLDivElement>
    closeMenu: () => void
}

export function useMenuRadialCommands({ menuRef, openMenu, closeMenu }: KeyCommands1) {
   
    useEffect(() => {

        const handleOutsideClick = (event: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)) closeMenu()
        }

        const handleKeyCommands = (event: KeyboardEvent) => {
            if(event.key === 'Escape') closeMenu()
            if(event.ctrlKey && event.key === 'ArrowUp') openMenu()
            if(event.ctrlKey && event.key === 'ArrowDown') closeMenu()
        }
    
        window.addEventListener('click', handleOutsideClick) 
        window.addEventListener('keydown', handleKeyCommands)

        return () => {
            window.removeEventListener('click', handleOutsideClick)
            window.removeEventListener('keydown', handleKeyCommands)
        }

    }, [menuRef, openMenu, closeMenu])

}

export function useMenuTableCommands({ menuRef, openMenu, closeMenu }: KeyCommands2) {

    useEffect(() => {

        const handleOutsideClick = (event: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)) closeMenu()
        }

        const handleKeyCommands = (event: KeyboardEvent) => {
            if(event.key === 'Escape') closeMenu()
            if(event.ctrlKey && event.key === 'ArrowRight') openMenu()
            if(event.ctrlKey && event.key === 'ArrowLeft') closeMenu()
        }
    
        window.addEventListener('click', handleOutsideClick) 
        window.addEventListener('keydown', handleKeyCommands)

        return () => {
            window.removeEventListener('click', handleOutsideClick)
            window.removeEventListener('keydown', handleKeyCommands)
        }

    }, [menuRef, openMenu, closeMenu])
    
}

export function useModalEditCommands({ menuRef, closeMenu, openMenu }: KeyCommands2) {
    
    useEffect(() => {

        const handleKeyCommands = (event: KeyboardEvent) => {
            if(event.key === 'Escape') closeMenu()
            if(event.ctrlKey && event.key === 'Enter') openMenu()
        }
    
        window.addEventListener('keydown', handleKeyCommands)

        return () => {
            window.removeEventListener('keydown', handleKeyCommands)
        }

    }, [menuRef, openMenu, closeMenu])

}

export function useEscape({ menuRef, closeMenu }: KeyCommands3) {
    
    useEffect(() => {

        const handleKeyCommands = (event: KeyboardEvent) => {
            if(event.key === 'Escape') closeMenu()
        }
    
        window.addEventListener('keydown', handleKeyCommands)

        return () => {
            window.removeEventListener('keydown', handleKeyCommands)
        }

    }, [menuRef, closeMenu])

}

export function useEscapeEnter({ menuRef, closeMenu, openMenu }: KeyCommands2) {
    
    useEffect(() => {

        const handleKeyCommands = (event: KeyboardEvent) => {
            if(event.key === 'Escape') closeMenu()
            if(event.ctrlKey && event.key === 'Enter') openMenu()
        }
    
        window.addEventListener('keydown', handleKeyCommands)

        return () => {
            window.removeEventListener('keydown', handleKeyCommands)
        }

    }, [menuRef, openMenu, closeMenu])

}

export function useEscapeClickOutside({ menuRef, closeMenu }: KeyCommands3) {
    
    useEffect(() => {

        const handleOutsideClick = (event: MouseEvent) => {
            if(!menuRef.current?.contains(event.target as Node)) closeMenu()
        }

        const handleKeyCommands = (event: KeyboardEvent) => {
            if(event.key === 'Escape') closeMenu()
        }
    
        window.addEventListener('click', handleOutsideClick) 
        window.addEventListener('keydown', handleKeyCommands)

        return () => {
            window.removeEventListener('click', handleOutsideClick)
            window.removeEventListener('keydown', handleKeyCommands)
        }

    }, [menuRef, closeMenu])

}
