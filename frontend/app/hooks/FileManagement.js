
const parseFile = async (file) => {
    const fileType = getFileType(file);
    if (fileType == 'csv')
        return parseCSVandGetColumnData(file, 0);
    else if (fileType == 'json')
        return await parseJSONandGetObjectValue(file, 'addresses');
    else
        return null;
};

const getFileType = (file) => file?.name?.split('.')?.reverse()[0]?.toLowerCase() || null;

const parseCSVandGetColumnData = (file, column) => {
    return new Promise((resolve, reject) => {
        try {
            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                try {
                    const csvData = event.target.result;
                    const rows = csvData.split('\n').map((row) => row.split(','));

                    const headerRow = rows[0];
                    const columnIndex = headerRow.indexOf(column);

                    if (columnIndex === -1) {
                        reject(new Error(`Column "${column}" not found in the CSV data.`));
                        return;
                    }

                    const columnData = rows.slice(1).map((row) => row[columnIndex]);

                    resolve(columnData);
                } catch (error) {
                    reject(error);
                }
            };

            fileReader.readAsText(file);
        } catch (error) {
            reject(error);
        }
    });
};

const parseJSONandGetObjectValue = async (file, objectKey) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);

                if (objectKey in jsonData) {
                    resolve(jsonData[objectKey]);
                } else {
                    reject(new Error(`Object key "${objectKey}" not found in the JSON data.`));
                }
            } catch (error) {
                reject(error);
            }
        };

        fileReader.readAsText(file);
    });
}


export { parseFile, getFileType };