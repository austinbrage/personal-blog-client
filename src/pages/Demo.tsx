import { useRef, useState } from "react";
import { MenuRadial } from "../components/MenuRadial";
import { MenuTable } from "../components/MenuTable";
import { ButtonAdd } from "../components/ButtonAdd";
import { ModalEditorAdd } from "../components/Modals/ModalEditorAdd";
import { ContentStyles } from "../types/sections";
import { defaultOptions } from "../enums/general";

export function DemoPage() {

    const modalRef = useRef<HTMLDivElement>(null)
    const [newSection, setNewSection] = useState<ContentStyles>(defaultOptions)
    
    return (
        <div className="p-8 pt-16 h-screen max-h-screen bg-[rgb(15,15,24)]">
            
            <h3 className="inline-block text-5xl text-left font-semibold leading-tight mb-2 text-white">
                Create article
            </h3>

            <ButtonAdd 
                demoMode={true}
                modalAdd={modalRef}
                modalContent={modalRef}
                editorMode={'create'}
            />
            <MenuTable 
                demoMode={true}
                toggleModal={() => {}}
                postsList={['AWS Issue', 'Remix Dev', 'Node vs Bun']} 
            />
            <MenuRadial
                enabled={true}
                demoMode={true}
                toggleModalEdit={() => {}}  
                toggleModalDelete={() => {}}
            />
            <ModalEditorAdd
                demoMode={true}
                newData={newSection}
                modalRef={modalRef}
                setNewData={setNewSection}
            />
        </div>
    )
}