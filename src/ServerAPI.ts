export class ServerAPI {

    public static saveLevelsData(LevelsData:string[][], callback:(result:any)=>any):void {
        let serverURL:string = "./php/save.php";
        let saveDataJSON = {"levelsList":LevelsData};
        let saveData = 'file_data='+JSON.stringify(saveDataJSON);
        ServerAPI.httpCall("POST", serverURL, saveData, callback);
    }

    private static httpCall(method: string, url:string, data:any, callback:(result:any)=>any) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        if (callback) {
            xhr.onload = function () {
                callback(JSON.parse(this['responseText']));
            };
        }
        if (data != null) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        } else {
            xhr.send();
        }
    }
}