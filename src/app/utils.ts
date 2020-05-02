export class SUtils {

    public static findElemsInList(field: string, value: any, list: Array<any>): Array<any> {
        const foundItems: Array<any> = [];
        if (list && list.length) {
          for (const index in list) {
            if (list[index][field] === value) {
              foundItems.push(list[index]);
            }
          }
        }
        return foundItems;
    }

    public static findElemInList(field: string, value: any, list: Array<any>): any {
        if (list && list.length) {
        for (const index in list) {
            if (list[index][field] === value) {
            return list[index];
            }
        }
        }
        return undefined;
    }

    public static findElemsInListObject(field: string, value: any, list: Array<any>): any {
        const foundItems = {};
        if (list && list.length) {
        for (const index in list) {
            if (list[index][field] === value) {
            foundItems[index] = list[index];
            }
        }
        }
        return foundItems;
    }
}