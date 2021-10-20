var treeModel = require('tree-model');

interface Employee { 
    uniqueId: number; 
    name: string; 
    children: Employee[]; 
}

class EmployeeOrgApp {
    tree: any;
    root: any;
    ceo: Employee;

    prevEm: any;
    prevTm: any;

    oldRoot: any;
    newRoot: any;
    
    constructor(ceo: Employee) {
        this.ceo = ceo;
        this.tree = new treeModel();
        this.root = this.tree.parse(ceo);
        this.oldRoot = this.root;
    }

    move(employeeID: number, supervisorID: number): void {
        var nodeEm = this.root.first((obj: any) => {
            if( obj.model.uniqueId == employeeID) {
                return obj;
            }
        });

        this.prevEm = nodeEm;

        var nodeTm = this.root.first((obj: any) => {
            if( obj.model.uniqueId == supervisorID) {
                return obj;
            }
        });

        this.prevTm = nodeTm;

        // console.log(nodeEm, nodeTm);

        nodeEm.drop();
        nodeTm.addChild(nodeEm);

        console.log(this.root.model);
        this.newRoot = this.root;
    }

    undo(): void {
        /** Undo last move action */ 
        this.root = this.oldRoot;
        console.log(this.oldRoot);

    }  
    
    redo(): void {
        this.root = this.newRoot;
        console.log(this.newRoot);
    }

    show(): void {
        console.log(this.root.model);
    }


    // getCurrentEmployee(employeeID: number, rootEmployee: Employee[], type: boolean, undoredo_flag: boolean, which: boolean): Employee[] {
    //     // get subordinates;
    //     let resultOrdinates: Employee[] = [];
    //     rootEmployee.forEach((item, index) => {
    //         if( item.uniqueId === employeeID ) {
    //             if(type){
    //                 this.selectedEmployee = item;
    //             }else{
    //                 this.targetEmployee = item;
    //             }
    //             // if(undoredo_flag) {
    //             //     if(which){
    //             //         item.subordinates = this.prev_targetEmployee;
    //             //     }else{
    //             //         item.subordinates = this.prev_selectedEmployee;
    //             //     }
    //             // }
    //         } else {
    //             this.getCurrentEmployee(employeeID, item.children, type, undoredo_flag, which);
    //         }
    //     });
    //     return resultOrdinates;
    // }

    // searchItem(employeeID: number, rootEmployee: Employee[]): any {
    //     for (var nodeIdx = 0; nodeIdx <= rootEmployee.length-1; nodeIdx++)
    //     {
    //         if (rootEmployee[nodeIdx].uniqueId === employeeID)
    //         {    
    //             console.log(rootEmployee[nodeIdx]);
    //             return rootEmployee[nodeIdx];
    //         }
    //         else
    //         {
    //             console.log("No Match! Trying " + rootEmployee[nodeIdx].children.length + " Children of Node ID#" + rootEmployee[nodeIdx].uniqueId);
    //             return this.searchItem(employeeID, rootEmployee[nodeIdx].children); 
    //         }
    //     }
    //     console.log("Done trying " + rootEmployee.length + " children. Returning False");
    //     return false;
    // }
}

export default EmployeeOrgApp;