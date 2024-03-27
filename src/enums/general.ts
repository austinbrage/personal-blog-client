import { sizeOptions } from "./size"
import { lineOptions } from "./line"
import { alignOptions } from "./align"
import { widthOptions } from './width'
import { heightOptions } from './height'
import { familyOptions } from "./family"
import { colorPalette1 } from "./color"
import { weightOptions } from "./weight"
import { marginOptions } from './margin'
import { radiusOptions } from './radius'  
import type { ContentStyles, ContentType, Styles } from "../types/sections"

const title: Styles = {
    color:        colorPalette1[0][0],
    width:        widthOptions['w-auto'],
    height:       heightOptions['h-auto'],
    fontSize:     sizeOptions["text-4xl"], 
    marginTop:    marginOptions['m-2'], 
    textAlign:    alignOptions['left'], 
    fontWeight:   weightOptions['semibold'], 
    fontFamily:   familyOptions['Arial'], 
    lineHeight:   lineOptions['lead-7'],
    borderRadius: radiusOptions['none']
}

const subtitle: Styles = {
    color:        colorPalette1[0][0],
    width:        widthOptions['w-auto'],
    height:       heightOptions['h-auto'],
    fontSize:     sizeOptions["text-3xl"], 
    marginTop:    marginOptions['m-2'], 
    textAlign:    alignOptions['left'], 
    fontWeight:   weightOptions['medium'], 
    fontFamily:   familyOptions['Arial'], 
    lineHeight:   lineOptions['lead-6'],
    borderRadius: radiusOptions['none']
}

const paragraph: Styles = {
    color:        colorPalette1[0][0],
    width:        widthOptions['w-auto'],
    height:       heightOptions['h-auto'],
    fontSize:     sizeOptions["text-lg"], 
    marginTop:    marginOptions['m-2'], 
    textAlign:    alignOptions['left'], 
    fontWeight:   weightOptions['normal'], 
    fontFamily:   familyOptions['Arial'], 
    lineHeight:   lineOptions['lead-4'],
    borderRadius: radiusOptions['none']
}

export const generalOptions: { name: ContentType, value: Styles }[] = [
    { name:'image_url',   value: title     },
    { name:'title',       value: title     },
    { name:'subtitle',    value: subtitle  },
    { name:'paragraph',   value: paragraph },
    { name:'blockquote',  value: paragraph },
    { name:'javascript',  value: paragraph },
    { name:'typescript',  value: paragraph },
    { name:'jsx',         value: paragraph },
]

export const defaultOptions: ContentStyles = {
    content: 'New Article Section',
    content_type: 'paragraph',
    styles: title,
    image: null
}