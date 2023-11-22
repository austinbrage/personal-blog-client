import { LegacyRef } from "react"
import { Shortcuts } from "./Shortcuts"
import { shortcutCommands1, shortcutCommands2 } from "./commands"

type Props = {
    modalRef: LegacyRef<HTMLDivElement>
    toggleModal: () => void
}

export function KeyboardInfo({ modalRef, toggleModal }: Props) {
    return (
        <div ref={modalRef} role="dialog" className="hidden relative col-auto col-start-2 row-auto row-start-2 w-full rounded-xl text-left shadow-xl transition-all left-1/3 -translate-x-1/2 bg-[rgb(32,33,35)] md:max-w-[672px] lg:max-w-[796px] xl:max-w-4xl" tabIndex={-1} style={{ pointerEvents: 'auto' }}>
            
            <div className="px-4 pb-4 pt-5 sm:p-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                <div className="flex">
                    <div className="flex items-center">
                        <div className="flex grow flex-col gap-1">
                            <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                                Keyboard shortcuts
                            </h2>
                        </div>
                    </div>
                </div>

                <button onClick={toggleModal} className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div className="p-4 sm:p-6">
                <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-9">

                    <Shortcuts shortcutCommands={shortcutCommands1}/>
                    <Shortcuts shortcutCommands={shortcutCommands2}/>
          
                    {/* <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Open new chat
                                </div>
                            </div>
                            
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Ctrl
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Shift
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-sm">
                                        o
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Focus chat input
                                </div>
                            </div>
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Shift
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-xs">
                                        Esc
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Copy last code block
                                </div>
                            </div>
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Ctrl
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Shift
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-sm">
                                        ;
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Copy last response
                                </div>
                            </div>
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Ctrl
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Shift
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-sm">
                                        c
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Set custom instructions
                                </div>
                            </div>
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Ctrl
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Shift
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-sm">
                                        i
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Toggle sidebar
                                </div>
                            </div>
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Ctrl
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Shift
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-sm">
                                        s
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Delete chat
                                </div>
                            </div>
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Ctrl
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Shift
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-sm">
                                        ⌫
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                            <div className="flex flex-shrink items-center overflow-hidden text-sm">
                                <div className="truncate">
                                    Show shortcuts
                                </div>
                            </div>
                            <div className="ml-3 flex flex-row gap-2">
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[50px]">
                                    <span className="text-xs">
                                        Ctrl
                                    </span>
                                </div>
                                <div className="my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300 min-w-[32px]">
                                    <span className="text-sm">
                                        /
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    
                </div>
            </div>
        </div>
    )
}