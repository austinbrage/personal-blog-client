type Props = {
    currentContent: string
    changeContent: (newContent: string) => void
}

export function ContentTab({ currentContent, changeContent }: Props) {
    
    return (
        <form className="p-4 md:p-5">
            <div className="w-[300px]">
                <div className="col-span-2">
                    <label htmlFor="content-editor-1" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Content
                    </label>
                    <textarea 
                        required
                        rows={5}
                        cols={40}
                        id="content-editor-1" 
                        name="content" 
                        placeholder="Type content" 
                        value={currentContent}
                        onChange={(e) => changeContent(e.target.value)} 
                        className="h-[200px] placeholder:text-xl text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    />
                </div>
            </div>
        </form>
    )
}