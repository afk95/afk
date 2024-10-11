import exceljs from "exceljs"
import {saveAs} from 'file-saver'

/**
 * 导出Excel表格
 * @params excelArr 列数据
 * @params sheetName 表头对应字段数组
 * @params fileName 导出文件名
 * @returns {Promise<void>}
 */
export const exportExcel = async (params) => {
    let row = params.excelArr
    let sheetName = 'Sheet1'
    let fileName = params.fileName

    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = params.col;
    worksheet.addRows(row);
    const data = await workbook.xlsx.writeBuffer();
    const blob = new Blob([data], {type: 'EXCEL_TYPE'});
    saveAs.saveAs(blob, fileName + '.xlsx');
}