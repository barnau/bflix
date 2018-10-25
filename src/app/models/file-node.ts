export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

export class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public type: any) {}
}

import {BehaviorSubject } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  // constructor(jsonString: string) {
  //   this.initialize(jsonString);
  // }

  initialize(jsonString: string) {
    // Parse the string to json object.
    const dataObject = JSON.parse(jsonString);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}


