import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import { useEscape } from '../../hooks/useCommands'
import { IoIosArrowDown } from "react-icons/io"
import { useArticleKeywords } from "../../hooks/useArticles"

type Props = {
    selectedKeys: string[]
    setSelectedKeys: Dispatch<SetStateAction<string[]>>
}

export function SelectKeywords({ selectedKeys, setSelectedKeys }: Props) {
    
    const { orderedKeywords } = useArticleKeywords()

    const selectRef = useRef<HTMLDivElement>(null)
    const [openCategory, setOpenCategory] = useState<string>('')
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    
    const handleCategory = (category: string) => {
        openCategory === category
            ? setOpenCategory('')
            : setOpenCategory(category)
    }

    const handleKeyword = (keyword: string) => {
        selectedKeys.includes(keyword)
            ? setSelectedKeys(prev => prev.filter(elem => elem !== keyword))
            : setSelectedKeys(prev => [...prev, keyword])
    }

    const handleClearAll = () => {
        setOpenCategory('')
        setSelectedKeys([])
    }
    
    useEscape({
        menuRef: selectRef,
        closeMenu: () => setOpenDropdown(false)
    })

    return (
        <div className="relative flex items-center justify-center p-4 mt-4">
            <button 
                type="button"
                onClick={() => setOpenDropdown(prev => !prev)}
                className="inline-flex items-center justify-between w-48 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 px-4 py-2.5 rounded-lg text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <p className='font-medium text-md text-white'>
                    Filter by keywords
                </p>
                <span className={`text-md transition-all ${openDropdown ? 'rotate-180' : 'rotate-0'}`}>
                    <IoIosArrowDown/>
                </span>
            </button>

            <div 
                ref={selectRef}
                className={`
                    absolute top-16 lef-0 z-10 w-52 p-3 rounded-lg shadow bg-gray-700
                    ${openDropdown ? 'block' : 'hidden'}
                `}
            >
                <div className='flex items-center justify-between mb-3'>
                    <h5 className="tracking-wider font-medium text-white">
                        Category
                    </h5>
                    <button 
                        type="button"
                        onClick={() => handleClearAll()}
                        className='font-medium text-sm text-primary-200 hover:underline'
                    >
                        Clear all
                    </button>
                </div>
                
                <ul className="space-y-2">
            
                    {Object.entries(orderedKeywords).map(([category, items], index1) => (
                        <div key={category}> 
                            <h6 
                                className={`
                                    text-sm 
                                    ${index1 !== Object.values(orderedKeywords).length - 1 
                                        ? 'py-1 border-b-[1px] border-opacity-75 border-b-gray-400 text-gray-400'
                                        : 'pt-1 pb-0'
                                    }
                                `.trim()}
                            >
                                <button 
                                    type="button" 
                                    onClick={() => handleCategory(category)}
                                    className='flex items-center justify-between w-full'
                                >
                                    <span 
                                        className={`
                                            font-semibold
                                            ${openCategory === category ? 'text-white' : 'text-gray-400'}
                                        `.trim()}
                                    >
                                        {category}
                                    </span>
                                    <span 
                                        className={`
                                            font-bold transition-all 
                                            ${openCategory === category ? 'rotate-180 text-white' : 'rotate-0 text-gray-400'}
                                        `.trim()}
                                    >
                                        <IoIosArrowDown/>
                                    </span>
                                </button>
                            </h6>

                            {openCategory === category && items.map((elem, index2) => (
                                <li 
                                    key={elem.id}
                                    onClick={() => handleKeyword(elem.keyword)} 
                                    className={`
                                        flex items-center
                                        ${index2 === 0 ? 'mt-3' : 'mt-0'}
                                        ${index2 === items.length - 1 ? 'mb-3' : 'mb-0'}
                                    `.trim()}
                                >
                                    <input 
                                        type="checkbox" 
                                        id={elem.keyword} 
                                        value={elem.keyword} 
                                        checked={selectedKeys.includes(elem.keyword)}
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                                    />
    
                                    <label 
                                        htmlFor={elem.keyword} 
                                        className="ml-2 text-sm font-medium tracking-wider text-gray-900 dark:text-gray-100"
                                    >
                                        {elem.keyword}
                                    </label>
                                </li>
                            ))}

                        </div>
                    ))}

                </ul>
            </div>
        </div>
    )
}