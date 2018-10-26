import {FlatTreeControl} from '@angular/cdk/tree';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Season, Episode } from 'src/app/models/tv';
import { FileDatabase, FileFlatNode, FileNode } from 'src/app/models/file-node';
import { Observable, of as observableOf } from 'rxjs';



@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.css'],
  providers: [FileDatabase]
})
export class TvDetailComponent implements OnInit {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  seasons: Season[];

  constructor(private route: ActivatedRoute, public database: FileDatabase) {
    debugger;
    var seasons = JSON.parse(this.route.snapshot.params['seasons']);
    var seasonsString =JSON.stringify(this.treeifySeasons(seasons));
    this.database.initialize(seasonsString);

    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  ngOnInit() {
    debugger;
    let seasonsString = this.route.snapshot.params['seasons'];
    this.seasons = JSON.parse(seasonsString);
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

    //  var x= seasons.map((season: Season) => {
    //   return result[season.seasonNumber] = {
    //     episodes: season.episodes
    //   }
    // });

    // x.episodes

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
