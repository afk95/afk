import html2canvas from "html2canvas";
import JsPDF from "jspdf";

/**
 * 输入 数字/千分位数字 转化成千分位
 * @param el   input element
 * @returns {string}  千分位数字
 */
export const getThousands = (el) => {
    let value = el.target.value || ''
    let str = addThousands(delThousands(value))
    return str.split('.')[0] + '.' + str.split('.')[1].substr(0, 2)
}

/**
 * 数字转化为千分位数字
 * @param value   数字
 * @returns {string|*}
 */
export const addThousands = (value) => {
    if (!value) return value
    value = String(value)
    let str = value.split('.')
    let re = /\d{1,3}(?=(\d{3})+$)/g
    let n1 = str[0].replace(re, "$&,")
    if (str[1]) {
        str[1] = str[1].substring(0,2)
    }
    return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`
}

/**
 * 千分位数字转化为数字
 * @param value
 * @returns {string|*}
 */
export const delThousands = (value) => {
    if (!value) return value
    value = value.toString()
    value = value.replace(/,/gi, '')
    return value
}