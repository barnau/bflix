import {FlatTreeControl} from '@angular/cdk/tree';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Season, Episode } from 'src/app/models/tv';
import { FileDatabase, FileFlatNode, FileNode } from 'src/app/models/file-node';



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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let seasonsString = this.route.snapshot.params['seasons'];
    this.seasons = JSON.parse(seasonsString);
  }
}
