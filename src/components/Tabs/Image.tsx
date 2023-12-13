type ImageProps = {
    currentImage: string | null
    changeImage: (newImage: string | null) => void
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
                    <textarea 
                        required
                        rows={2}
                        cols={20}
                        id="content-editor-2" 
                        name="imageTitle" 
                        placeholder="A red rose in the sunlight" 
                        value={currentContent}
                        onChange={(e) => changeContent(e.target.value)} 
                        className="h-[100px] placeholder:text-xl text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    />
                </div>
            </div>
        </form>
    )
}

export function ImageTab({ currentImage, changeImage }: ImageProps) {
    
    return (
        <form className="ps-5 pt-3">
            <div className="w-[300px]">
                <div className="col-span-2">
                    <label htmlFor="content-editor-3" className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Image URL
                    </label>
                    <textarea 
                        required
                        rows={2}
                        cols={40}
                        id="content-editor-3" 
                        name="imageURL" 
                        placeholder="https://myimage.com/..." 
                        value={currentImage ? currentImage : ''}
                        onChange={(e) => changeImage(e.target.value)} 
                        className="h-[100px] placeholder:text-xl text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    />
                </div>
            </div>
        </form>
    )
}