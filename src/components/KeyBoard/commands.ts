type ShortcutKeys = {
    key: string
    sizeText: string
    sizeNumber: string
}

export type ShortcutCommands = {
    shortcutName: string
    shortcutKeys: ShortcutKeys[] 
}

export const shortcutCommands1: ShortcutCommands[] = [
    {
        shortcutName: 'Open add-modal',
        shortcutKeys: [
            {
                key: 'Ctrl',
                sizeText: 'xs',
                sizeNumber: '50px'
            },
            {
                key: 'Enter',
                sizeText: 'xs',
                sizeNumber: '50px'
            }
        ]
    },
    {
        shortcutName: 'Open options-menu',
        shortcutKeys: [
            {
                key: 'Ctrl',
                sizeText: 'xs',
                sizeNumber: '50px'
            },
            {
                key: 'Arrow Up',
                sizeText: 'xs',
                sizeNumber: '50px'
            }
        ]
    },
    {
        shortcutName: 'Open articles-menu',
        shortcutKeys: [
            {
                key: 'Ctrl',
                sizeText: 'xs',
                sizeNumber: '50px'
            },
            {
                key: 'Arrow Right',
                sizeText: 'xs',
                sizeNumber: '50px'
            }
        ]
    },
    {
        shortcutName: 'Close all menus',
        shortcutKeys: [
            {
                key: 'Click',
                sizeText: 'xs',
                sizeNumber: '50px'
            },
            {
                key: 'Outside',
                sizeText: 'xs',
                sizeNumber: '50px'
            },
        ]
    },
]

export const shortcutCommands2: ShortcutCommands[] = [
    {
        shortcutName: 'Close add-modal',
        shortcutKeys: [
            {
                key: 'Escape',
                sizeText: 'xs',
                sizeNumber: '50px'
            }
        ]
    },
    {
        shortcutName: 'Close options-menu',
        shortcutKeys: [
            {
                key: 'Ctrl',
                sizeText: 'xs',
                sizeNumber: '50px'
            },
            {
                key: 'Arrow Down',
                sizeText: 'xs',
                sizeNumber: '50px'
            }
        ]
    },
    {
        shortcutName: 'Close articles-menu',
        shortcutKeys: [
            {
                key: 'Ctrl',
                sizeText: 'xs',
                sizeNumber: '50px'
            },
            {
                key: 'Arrow Left',
                sizeText: 'xs',
                sizeNumber: '50px'
            }
        ]
    },
    {
        shortcutName: 'Close all menus',
        shortcutKeys: [
            {
                key: 'Escape',
                sizeText: 'xs',
                sizeNumber: '50px'
            }
        ]
    },
]