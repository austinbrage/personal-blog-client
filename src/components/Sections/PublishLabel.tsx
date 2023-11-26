type Props = {
    isPublish?: boolean
}

export function PublishLabel({ isPublish }: Props) {

    if(typeof isPublish === 'undefined') return

    return (
        <>
            {
                isPublish ? (
                    <span className="inline-flex ms-3 items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        Published
                    </span>
                ) : (
                    <span className="inline-flex ms-3 items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                        Unpublished
                    </span>
                )
            }
        </>
    )
} 