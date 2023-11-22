import { type ShortcutCommands } from "./commands"

type Props = {
    shortcutCommands: ShortcutCommands[]
}

export function Shortcuts({ shortcutCommands }: Props) {
    return (
        <div className="flex flex-col overflow-hidden">
                
                {shortcutCommands.map((shortcut, index1) => ( 
                   
                   <div className="flex items-center justify-between overflow-hidden text-gray-600 dark:text-gray-300">
                        <div key={index1} className="flex flex-shrink items-center overflow-hidden text-sm">
                            <div className="truncate">
                                {shortcut.shortcutName}
                            </div>
                        </div>

                        <div className="ml-3 flex flex-row gap-2">
                           
                            {shortcut.shortcutKeys.map((key, index2) => (
                                
                                <div key={index2} className={`min-w-[${key.sizeNumber}] px-2 my-2 flex h-8 items-center justify-center rounded-[4px] border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300`}>
                                    <span className={`text-${key.sizeText}`}>
                                        {key.key}
                                    </span>
                                </div>

                            ))}

                        </div>
                    </div>

                ))}

        </div>
    )
}