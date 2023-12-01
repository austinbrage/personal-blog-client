import { useAPIStore } from '../../stores/api'
import { useEscapeEnter } from '../../hooks/useCommands'
import { type RefObject } from 'react'
import './ButtonAdd.css'

type Props = {
    editorMode: string
    modalAdd: RefObject<HTMLDivElement>
    modalContent: RefObject<HTMLDivElement>
}

export function ButtonAdd({ editorMode, modalAdd, modalContent }: Props) {
    
    const updateAddMode = useAPIStore(state => state.updateAddMode)

    const openModal = () => {
        editorMode === 'edit' || modalAdd.current?.classList.remove('hidden')
        editorMode === 'edit' || modalAdd.current?.classList.add('flex')
        
        editorMode === 'edit' && updateAddMode(true)
        editorMode === 'edit' && modalContent.current?.classList.remove('hidden')
        editorMode === 'edit' && modalContent.current?.classList.add('flex')
    }

    const closeModal = () => {
        editorMode === 'edit' || modalAdd.current?.classList.remove('flex')
        editorMode === 'edit' || modalAdd.current?.classList.remove('flex')
        
        editorMode === 'edit' && updateAddMode(false)
        editorMode === 'edit' && modalContent.current?.classList.add('hidden')
        editorMode === 'edit' && modalContent.current?.classList.remove('flex')
    }

    useEscapeEnter({
        menuRef: editorMode !== 'edit' ? modalAdd : modalContent,
        openMenu: openModal,
        closeMenu: closeModal
    })

    return (
        <div className='button-add-section'>
            <button 
                type='button' 
                onClick={openModal} 
                data-text={editorMode === 'edit' ? "Add New Section" : "Add New Article"} 
                data-pos="top align-left"
            >
            
                <svg className="injected-svg icon-new" viewBox="0 0 48 48" width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" aria-labelledby="new-title-10 new-desc-10" data-src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/436544/mui-assets.svg#new">
                    <title id="new-title-10"></title><desc id="new-desc-10">new</desc>
                    <path d="M35.25,22.5H25.5V12.75A0.75,0.75,0,0,0,24.75,12h-1.5a0.75,0.75,0,0,0-.75.75V22.5H12.75a0.75,0.75,0,0,0-.75.75v1.5a0.75,0.75,0,0,0,.75.75H22.5v9.75a0.75,0.75,0,0,0,.75.75h1.5a0.75,0.75,0,0,0,.75-0.75V25.5h9.75A0.75,0.75,0,0,0,36,24.75v-1.5A0.75,0.75,0,0,0,35.25,22.5Z" role="presentation"></path>
                    <path d="M6,6h5.25A0.75,0.75,0,0,0,12,5.25V3.75A0.75,0.75,0,0,0,11.25,3H6A3,3,0,0,0,3,6v5.25a0.75,0.75,0,0,0,.75.75H5.22A0.78,0.78,0,0,0,6,11.22V6Z" role="presentation"></path>
                    <rect x="18" y="3" width="12" height="3" rx="0.75" ry="0.75" role="presentation"></rect>
                    <path d="M42,6v5.25a0.75,0.75,0,0,0,.75.75h1.5A0.75,0.75,0,0,0,45,11.25V6a3,3,0,0,0-3-3H36.75a0.75,0.75,0,0,0-.75.75V5.22a0.78,0.78,0,0,0,.78.79H42Z" role="presentation"></path>
                    <rect x="42" y="18" width="3" height="12" rx="0.75" ry="0.75" role="presentation"></rect>
                    <path d="M42,42H36.75a0.75,0.75,0,0,0-.75.75v1.5a0.75,0.75,0,0,0,.75.75H42a3,3,0,0,0,3-3V36.75A0.75,0.75,0,0,0,44.25,36H42.79a0.78,0.78,0,0,0-.78.78V42Z" role="presentation"></path>
                    <rect x="18" y="42" width="12" height="3" rx="0.75" ry="0.75" role="presentation"></rect>
                    <path d="M6,42V36.75A0.75,0.75,0,0,0,5.25,36H3.75a0.75,0.75,0,0,0-.75.75V42a3,3,0,0,0,3,3h5.25A0.75,0.75,0,0,0,12,44.25V42.79A0.78,0.78,0,0,0,11.22,42H6Z" role="presentation"></path>
                    <rect x="3" y="18" width="3" height="12" rx="0.75" ry="0.75" role="presentation"></rect>
                </svg>

            </button>
        </div>
    )
}