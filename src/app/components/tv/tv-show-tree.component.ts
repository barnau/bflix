import { Component, OnInit, Injectable, Input } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Season, Episode } from 'src/app/models/tv';
import { FileDatabase, FileFlatNode, FileNode } from 'src/app/models/file-node';
import { Observable, of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-tv-show-tree',
  templateUrl: './tv-show-tree.component.html',
  styleUrls: ['./tv-show-tree.component.css']
})
export class TvShowTreeComponent implements OnInit {

  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  @Input()
  seasons: any;

  constructor(public database: FileDatabase) {
    debugger;

  }

  ngOnInit() {
    debugger;
    console.log(this.seasons);
    var seasonsString =JSON.stringify(this.treeifySeasons(this.seasons));
    this.database.initialize(seasonsString);

    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type);
  }

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  treeifySeasons(seasons: Season[]) {
    Object.keys(seasons);
    let result: any = {}

    seasons.forEach((season: Season) => {
      result[season.seasonNumber] = {};
      season.episodes.forEach((episode: Episode) => {
        result[season.seasonNumber][episode.name] = episode.location;
      })
    })
    debugger;

    return result;



  }

}
