import { useRef, type ChangeEvent } from "react"
import { FaUpload } from "react-icons/fa"

type ImageProps = {
    file: File | null
    cleanFile: () => void
    currentImage: string | null
    changeImage: (newImage: string | null) => void
    handleSectionChange: (insertedFile: ChangeEvent<HTMLInputElement>) => void
}

type ContentProps = {
    currentContent: string
    changeContent: (newContent: string) => void
}

export function ContentAltTab({ currentContent, changeContent }: ContentProps) {
    
    return (
        <form className="ps-5 pt-1">
            <div className="w-[300px]">
                <div className="col-span-2">
                    <label htmlFor="content-editor-2" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image TITLE 
                        <span className='ms-1 italic'>
                            [alt text]
                        </span>
                    </label>
                    <input 
                        required
                        id="content-editor-2" 
                        name="imageTitle" 
                        placeholder="A red rose in the sunlight" 
                        value={currentContent}
                        onChange={(e) => changeContent(e.target.value)} 
                        className="h-[50px] placeholder:text-lg text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    />
                </div>
            </div>
        </form>
    )
}

export function ImageTab({ file, cleanFile, currentImage, changeImage, handleSectionChange }: ImageProps) {
    
    const sectionFileRef = useRef<HTMLInputElement>(null)    

    const uploadSection = () => {
        if(!sectionFileRef.current) return
        sectionFileRef.current.click()
    }

    const handleClean = () => {
        cleanFile()
        if(sectionFileRef?.current) sectionFileRef.current.value = ''
    }

    return (
        <form className="ps-5 pt-3">
            <div className="w-[300px]">
                <div className="col-span-2">
                    <label htmlFor="content-editor-3" className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        {file ? 'Image FILE' : 'Image URL'}
                    </label>
                    <input 
                        required
                        id="content-editor-3" 
                        name="imageURL" 
                        placeholder="https://myimage.com/..." 
                        disabled={Boolean(file)}
                        value={currentImage ? currentImage : ''}
                        onChange={(e) => changeImage(e.target.value)} 
                        className="h-[50px] placeholder:text-lg text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    />
                </div>
                <div>
                    <input 
                        type="file" 
                        id="sectionFile"  
                        ref={sectionFileRef}
                        className="hidden"
                        onChange={(e) => handleSectionChange(e)} 
                    />
                    {
                        file ? (
                            <button 
                                type="button"
                                onClick={() => handleClean()}
                                className="mt-2 inline-flex items-center justify-center w-full text-md font-medium rounded-md px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
                            >
                                Clean input file
                            </button>
                        ) : (
                            <button
                                type='button'
                                onClick={() => uploadSection()}
                                className='mt-2 inline-flex items-center justify-center w-full text-md font-medium rounded-md px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800'
                            >
                                <span className="text-lg me-2">
                                    <FaUpload/>
                                </span>
                                Choose file instead
                            </button>
                        )
                    }
                    <p className="truncate flex items-center justify-center italic tracking-wider text-white">
                        {file ? file.name : 'No file inserted'}
                    </p>
                </div>
            </div>
        </form>
    )
}