import { sizeOptions } from "./size"
import { lineOptions } from "./line"
import { alignOptions } from "./align"
import { familyOptions } from "./family"
import { colorPalette1 } from "./color"
import { weightOptions } from "./weight"
import { marginOptions } from './margin'
import type { ContentStyles, ContentType, Styles } from "../types/sections"

const title: Styles = {
    color:      colorPalette1[0][0],
    fontSize:   sizeOptions["text-4xl"], 
    marginTop:  marginOptions['m-2'], 
    textAlign:  alignOptions['left'], 
    fontWeight: weightOptions['semibold'], 
    fontFamily: familyOptions['Arial'], 
    lineHeight: lineOptions['lead-7']
}

const subtitle: Styles = {
    color:      colorPalette1[0][0],
    fontSize:   sizeOptions["text-3xl"], 
    marginTop:  marginOptions['m-2'], 
    textAlign:  alignOptions['left'], 
    fontWeight: weightOptions['medium'], 
    fontFamily: familyOptions['Arial'], 
    lineHeight: lineOptions['lead-6']
}

const paragraph: Styles = {
    color:      colorPalette1[0][0],
    fontSize:   sizeOptions["text-lg"], 
    marginTop:  marginOptions['m-2'], 
    textAlign:  alignOptions['left'], 
    fontWeight: weightOptions['normal'], 
    fontFamily: familyOptions['Arial'], 
    lineHeight: lineOptions['lead-4']
}

export const generalOptions: { name: ContentType, value: Styles }[] = [
    { name:'title',       value: title     },
    { name:'subtitle',    value: subtitle  },
    { name:'paragraph',   value: paragraph },
    { name:'javascript',  value: paragraph },
    { name:'blockquote', value: paragraph },
]

export const defaultOptions: ContentStyles = {
    content: 'New Article Section',
    content_type: 'paragraph',
    styles: title
}