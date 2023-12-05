import { sizeOptions } from "./size"
import { lineOptions } from "./line"
import { alignOptions } from "./align"
import { familyOptions } from "./family"
import { colorPalette1 } from "./color"
import { weightOptions } from "./weight"
import { marginOptions } from './margin'
import { type Styles } from "../types/sections"

const mainTitle: Styles = {
    color:      colorPalette1[0][0],
    fontSize:   sizeOptions["text-5xl"], 
    marginTop:  marginOptions['m-0'], 
    textAlign:  alignOptions['left'], 
    fontWeight: weightOptions['bold'].toString(), 
    fontFamily: familyOptions['Arial'], 
    lineHeight: lineOptions['lead-8']
}

const title: Styles = {
    color:      colorPalette1[0][0],
    fontSize:   sizeOptions["text-4xl"], 
    marginTop:  marginOptions['m-2'], 
    textAlign:  alignOptions['left'], 
    fontWeight: weightOptions['semibold'].toString(), 
    fontFamily: familyOptions['Arial'], 
    lineHeight: lineOptions['lead-7']
}

const subtitle: Styles = {
    color:      colorPalette1[0][0],
    fontSize:   sizeOptions["text-3xl"], 
    marginTop:  marginOptions['m-2'], 
    textAlign:  alignOptions['left'], 
    fontWeight: weightOptions['medium'].toString(), 
    fontFamily: familyOptions['Arial'], 
    lineHeight: lineOptions['lead-6']
}

const paragraph: Styles = {
    color:      colorPalette1[0][0],
    fontSize:   sizeOptions["text-lg"], 
    marginTop:  marginOptions['m-2'], 
    textAlign:  alignOptions['left'], 
    fontWeight: weightOptions['normal'].toString(), 
    fontFamily: familyOptions['Arial'], 
    lineHeight: lineOptions['lead-4']
}

export const generalOptions = [
    { name:'Main title', value: mainTitle },
    { name:'Title',      value: title     },
    { name:'Subtitle',   value: subtitle  },
    { name:'Paragraph',  value: paragraph },
]